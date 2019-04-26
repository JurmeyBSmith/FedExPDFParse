const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = (app, connection) => {

    app.post('/api/receiving', function (req, res) {

        //================Mitchell test code ===================
        // var trackNumber = req.body.trackingNumber;
        // this.getThePDF(trackNumber, (a_filePath) => {
        //     this.parsePDF(a_filePath, (a_jsonObjectResults) => {
        //         this.saveDataBase(a_jsonObjectResults, (results) => {
        //             res.send();
        //         })
        //     })
        // })


        // function getThePDF(trackingNumber, a_callback) {
        //     // do something

        //     var filePath = 'myFile';
        //     a_callback(filePath);
        // }

        //======================================================
        const trackingNumber = req.body.trackingNumber;
        const pdfPath = "routes/pdfFiles/" + trackingNumber + ".pdf";
        const strBaseFedEx = "https://www.fedex.com/trackingCal/retrievePDF.jsp?trackingNumber=" + trackingNumber + "&trackingQualifier=12019~" + trackingNumber + "~FDEG&trackingCarrier=FDXG&shipDate=&destCountry=&locale=en_US&accountNbr=148750947&type=SPOD&appType=&anon=";
        var text;
        var textNum;
        // make fedex request

        get_POD(strBaseFedEx, pdfPath, (a_pathToPOD) => {
            parse_POD(a_pathToPOD, (a_dataText) => {
                //console.log("After get data: ", a_dataText);
                text = a_dataText.match(/(:+|[a-z]+|\S+)/gi);
                var textSemicolon = a_dataText.split(/\s*(?::|$)\s*/);
                textNum = a_dataText.match(/\d+/g);
                var trackNumText = textNum[2];
                var deliverMonth = text[33];
                var deliverDay = textNum[3];
                var deliverYear = textNum[4];
                var reference = textNum[14];
                var shipLb = textNum[10];
                var shipOz = textNum[11];
                var delCity = text[23];
                var delState = text[25];
                console.log("\n\nText: \n\n", text, "\n\n Text Nmbers: \n\n", textNum, "\n\n Semi colons: \n\n", textSemicolon);
                console.log("\n\nGetting data out of PDF...\n\n\nTracking Number:", trackNumText, 
                    "\nDelivery Date:", deliverMonth, deliverDay, deliverYear, 
                    "\nReference: #", reference, 
                    "\nShipping Weight:", shipLb,'lb.',shipOz, 'oz.',
                    "\nDelivery Location:", delCity, delState
                );
            })
        })

    });


    //     const file = fs.createWriteStream(pdfPath);
    //     axios({ // async
    //         method: 'get',
    //         url: strBaseFedEx,
    //         responseType: 'stream'
    //     })
    //         .then(response => {
    //             response.data.pipe(file);
    //             // parse the pod
    //             var podData = get_data(pdfPath)
    //             // insert into the database
    //             var sql = `INSERT INTO \`shipment\` (\`tracking_number\`, \`reference_number\`, \`store\`, \`street\`, \`state\`, \`zip\`, \`city\`, \`country\`, \`status\`, \`delivered_date\`, \`received_date\`) VALUES (\'${trkNm}\', \'r3f3r3nc3numb3r\', \'store\', \'street\', \'${podData.state}\', \'92592\', \'Escondido\', \'US\', \'Passed\', \'1996-04-01\', \'1996-04-01\')`;
    //             connection.query(sql, function (err, result) {
    //                 if (err) {
    //                     res.status(400).send({ message: 'Something went wrong, when entering into the database. Please contact Mr. Smith. ', success: false, data: err });
    //                     throw err;
    //                 }
    //                 console.log("Post request successful!");
    //                 res.status(200).send({ message: 'POD recieved and prased. ', success: true, data: podData });
    //             });
    //         }).catch(err => {
    //             console.log(err)
    //             res.status(400).send({ message: 'Something went wrong. Please contact Mr. Smith. ', success: false, data: err });
    //         })
    // })

    app.get('/api/receiving', (req, res) => {
        console.log('This is the get request from receiving');
        res.status(200).send('Here is the receiving number');
    })


    function get_POD(strBaseFedEx, pdfPath, a_callback) {
        //request to fedex for pdf
        const file = fs.createWriteStream(pdfPath);
        axios({ // async
            method: 'get',
            url: strBaseFedEx,
            responseType: 'stream'
        })
            .then(response => {
                //console.log('About to pipe the file');
                response.data.pipe(file).on('finish', () => { // async
                    //console.log("Path = ", pdfPath)
                    a_callback(pdfPath);
                });
            }).catch(err => {
                console.log(err)
            })
        // pdfTOTEXT and then walk that data and get what we need out. 

        //var podData = { address: '126 foo road', state: 'CA' };

        //return podData;
    }

    //function parse_pdf()
    function parse_POD(pdfPath, a_callback) {
        var dataBuffer = fs.readFileSync(pdfPath);
        pdf(dataBuffer) // async
            .then(data => {
                console.log('PDF->Text');
                // number of pages
                // console.log(data.numpages);
                // number of rendered pages
                // console.log(data.numrender);
                // PDF info
                // console.log(data.info);
                // PDF metadata
                // console.log(data.metadata);
                // PDF.js version
                // check https://mozilla.github.io/pdf.js/getting_started/
                // console.log(data.version);
                // PDF text
                // console.log(data.text);
                //get_data(strBaseFedEx, trackingNumber, pdfPath);
                a_callback(data.text);
                text = data.text;
            }).catch(err => {
                console.log(err)
            });
    }
}
