const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = (app, connection) => {

    app.post('/receiving/update', (req, res) => {
        var form = req.body.formObj;
        var sql = `UPDATE \`shipment\` SET \`tracking_number\` = \'${form.trackingNumber}\', \`reference_number\` = \'${form.reference}\', \`store\` = 'store', \`street\` = 'street', \`state\` = \'${form.shipState}\', \`zip\` = 'zip', \`city\` = \'${form.shipcity}\', \`country\` = \'${form.shipCountry}\', \`status\` = \'${form.status}\', \`received_date\` = \'${form.deliveryDate}\', \`shipped_date\` = \'${form.shipDate}\' WHERE \`shipment\`.\`tracking_number\` = \'${form.trackingNumber}\'`; 
        connection.query(sql, function (err, result) {
            if(err){
                console.log(err);
            }
            res.send(result)
          });
        
    })

    app.post('/api/testing', function (req, res) {

        var date = new Date();
        var year = req.body.year;//date.getYear()+1900;
        console.log('THe year:', year);
        const trackingNumber = req.body.trackingNumber;
        const pdfPath = "routes/pdfFiles/" + trackingNumber + ".pdf";
        const strBaseFedEx = "https://www.fedex.com/trackingCal/retrievePDF.jsp?trackingNumber=" + trackingNumber + "&trackingQualifier=1" + year + "~" + trackingNumber + "~FDEG&trackingCarrier=FDXG&shipDate=&destCountry=&locale=en_US&accountNbr=148750947&type=SPOD&appType=&anon=";
        var text;
        var textNum;

        console.log('The URL is:', strBaseFedEx);
        get_POD(year, strBaseFedEx, pdfPath)
            .then(a_pdfPath => {
                parse_POD(a_pdfPath)
                    .then(a_pdfData => {
                        console.log("Response: ", a_pdfData.text);
                        //res.send(a_pdfData.text);
                        var jsonData = pull_Data(a_pdfData);
                        connection.query(jsonData.sql, function (err, result) {
                            if (err) {
                                console.log("Entering data into DB: Error:", err)
                                throw err;
                            }
                            console.log("Post Successful");
                            //console.log("Year: ", date.getYear()+1900);
                            var jsonResponse = {
                                success: true,
                                message: 'Parsed and entered data into the database.',
                                data: {
                                    pdfPath: a_pdfPath,
                                    data: jsonData
                                }
                            }
                            res.status(200).send(jsonResponse);
                        });

                    }).catch(err => {
                        console.log("Parse_POD: Error:", err);
                        res.status(200).send(err);
                    })
            }).catch(err => {
                console.log("ERRORR2");
                res.send(err);
                reject(err);
            })
    });

    app.get('/api/receiving', (req, res) => {
        console.log('This is the get request from receiving');
        res.status(200).send('Here is the receiving number');
    })

    function get_POD(year, strBaseFedEx, pdfPath) {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(pdfPath);
            axios({ // async
                method: 'get',
                url: strBaseFedEx,
                responseType: 'stream'
            })
                .then(response => {
                    console.log("Response:", response.eventsCount);
                    console.log('About to pipe the file');
                    response.data.pipe(file).on('finish', () => { // async
                        //console.log("Path = ", pdfPath)
                        resolve(pdfPath)
                    });
                }).catch(err => {
                    console.log("ERROOROR", err)
                    reject(err);
                    // get_POD(year - 1, strBaseFedEx, pdfPath, a_callback);
                })
        })
    }

    //function parse_pdf()
    function parse_POD(pdfPath, a_callbackSuccess, a_callbackFailed) {
        return new Promise((resolve, reject) => {
            console.log("CALLED PARSE_POD");
            var dataBuffer = fs.readFileSync(pdfPath);
            pdf(dataBuffer) // async
                .then(data => {
                    console.log("About to console data");
                    console.log("THis is the data", data.text)
                    resolve(data)
                }).catch(err => {
                    console.log("pdf: Error in Reading the PDF: ", err);
                    reject(err);
                })
        })

    }


    function pull_Data(a_dataText) {
        text = a_dataText.text.toLowerCase().match(/(:+|[a-z]+|\S+)/gi);
        //variables
        var TrackingNumber;
        var Reference;
        var Status;
        var Signee;
        var DeliveryDate;
        var ShipDate;
        var ShipCity;
        var ShipState;
        var ShipCountry;

        for (var i = 0; i < text.length; i++) {
            switch (text[i]) {

                case "tracking":
                    if (text[i + 2] == ":") {
                        TrackingNumber = get_TrackingNumber(text, i);
                    }
                    break;
                case "status":
                    Status = get_Status(text, i);
                    break;
                case "location":
                    if (text[i - 1].includes('delivery')) {
                        DeliveryLocation = text[i + 2];
                    }
                    break;
                case "signed":

                    Signee = get_Signee(text, i);
                    break;
                case "date":
                    if (text[i - 1].includes('delivery')) {
                        DeliveryDate = get_DeliveryDate(text, i);
                    } else if (text[i - 1].includes('ship')) {
                        ShipDate = get_ShipDate(text, i);
                    }
                    break;
                case "shipper":
                    if (text[i + 1] != "or") {
                        ShipCity = text[i + 5].substr(2);
                        ShipState = text[i + 7].toUpperCase();
                        ShipCountry = text[i + 8].toUpperCase();
                    }
                    break;

                case "invoice":
                    if (text[i + 1].includes('number')) {
                        Reference = get_Reference(text, i);
                    }
                    break;
                default:
                    //console.log("hit default");
                    break;
            }
        }
        //sql command
        var sql = `INSERT INTO \`shipment\` (\`shipment_id\`, \`tracking_number\`, \`reference_number\`, \`store\`, \`street\`, \`state\`, \`zip\`, \`city\`, \`country\`, \`status\`, \`received_date\`, \`shipped_date\`) VALUES (NULL, \'${TrackingNumber}\', \'${Reference}', \'store\', \'street\', \'${ShipState}\', \'zip\', \'${ShipCity}\', \'${ShipCountry}\', \'${Status}\', \'${DeliveryDate}\', \'${ShipDate}\');`

        console.log(
            "\nTracking Number: ", TrackingNumber,
            "\nReference: ", Reference,
            "\nShip Date: ", ShipDate,
            "\nDelivery Date: ", DeliveryDate,
            "\nSigned for by: ", Signee,
            "\nStatus: ", Status,
            "\nShipped from City: ", ShipCity,
            "\nShipped from State: ", ShipState,
            "\nShipped from Country: ", ShipCountry
        );
        var jsonData = {
            sql: sql,
            trackingNumber: TrackingNumber,
            reference: Reference, 
            shipDate: ShipDate,
            deliveryDate: DeliveryDate,
            signee: Signee,
            status: Status,
            shipcity: ShipCity,
            shipState: ShipState,
            shipCountry: ShipCountry
        } 
        return jsonData;
    }
    function get_TrackingNumber(text, i) {
        return text[i + 3].replace('ship', '');
    };
    function get_Status(text, i) {
        return text[i + 2].replace('delivery', '');

    };
    function get_Signee(text, i) {
        return text[i + 4].replace('delivery', '');

    };
    function get_DeliveryDate(text, i) {
        return convert_Date(text[i + 2]) + '-' + text[i + 3].replace(',', '') + '-' + text[i + 4].replace(',', '');

    };
    function get_ShipDate(text, i) {
        return convert_Date(text[i + 2]) + '-' + text[i + 3].replace(',', '') + '-' + text[i + 4].replace(',', '');

    };
    function get_Reference(text, i) {
        return text[i + 1].replace('number', '').toUpperCase() + text[i + 2].replace('#', '').toUpperCase();

    };
    function convert_Date(text1) {
        switch (text1) {
            case "jan":
                text1 = text1.replace('jan', '01');
                break;
            case "feb":
                text1 = text1.replace('feb', '02');
                break;
            case "mar":
                text1 = text1.replace('mar', '03');
                break;
            case "apr":
                text1 = text1.replace('apr', '04');
                break;
            case "may":
                text1 = text1.replace('may', '05');
                break;
            case "jun":
                text1 = text1.replace('jun', '06');
                break;
            case "jul":
                text1 = text1.replace('jul', '07');
                break;
            case "aug":
                text1 = text1.replace('aug', '08');
                break;
            case "sep":
                text1 = text1.replace('sep', '09');
                break;
            case "oct":
                text1 = text1.replace('oct', '10');
                break;
            case "nov":
                text1 = text1.replace('nov', '11');
                break;
            case "dec":
                text1 = text1.replace('dec', '12');
                break;

            default:
                break;
        }
        return text1;
    }
}