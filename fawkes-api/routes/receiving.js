const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = (app, connection) => {

    app.post('/api/receiving', function (req, res) {

        var date = new Date();
        var year = 2019;//date.getYear()+1900;
        const trackingNumber = req.body.trackingNumber;
        const pdfPath = "routes/pdfFiles/" + trackingNumber + ".pdf";
        const strBaseFedEx = "https://www.fedex.com/trackingCal/retrievePDF.jsp?trackingNumber=" + trackingNumber + "&trackingQualifier=1" + year + "~" + trackingNumber + "~FDEG&trackingCarrier=FDXG&shipDate=&destCountry=&locale=en_US&accountNbr=148750947&type=SPOD&appType=&anon=";
        var text;
        var textNum;
        
        // make fedex request
        get_POD(year, strBaseFedEx, pdfPath, (a_pathToPOD, a_bRetry) => {
            if (a_bRetry) {
                console.log('We are retrying cause we failed.')
            }
            parse_POD(a_pathToPOD, (a_dataText) => {
                //console.log("After get data: ", a_dataText);
                text = a_dataText.toLowerCase().match(/(:+|[a-z]+|\S+)/gi);
                var textSemicolon = a_dataText.split(/\s*(?::|$)\s*/);
                textNum = a_dataText.match(/\d+/g);
                // var trackNumText = textNum[2];
                // var deliverMonth = text[33];
                // var deliverDay = textNum[3];
                // var deliverYear = textNum[4];
                // var reference = textNum[14];
                // var shipLb = textNum[10];
                // var shipOz = textNum[11];
                // var delCity = text[23];
                // var delState = text[25];
                //console.log("\n\nText: \n\n", text, "\n\n Text Nmbers: \n\n", textNum, "\n\n Semi colons: \n\n", textSemicolon);
                //console.log("\n\nGetting data out of PDF...\n\n\nTracking Number:", trackNumText, 
                //     "\nDelivery Date:", deliverMonth, deliverDay, deliverYear, 
                //     "\nReference: #", reference, 
                //     "\nShipping Weight:", shipLb,'lb.',shipOz, 'oz.',
                //     "\nDelivery Location:", delCity, delState
                // );
                connection.query(pull_Data(a_dataText), function (err, result) {
                    if (err) throw err;
                    console.log("Post Successful");
                    console.log("Year: ", date.getYear()+1900);
                    res.send(result)
                });
            })

           
        })
    });


    app.get('/api/receiving', (req, res) => {
        console.log('This is the get request from receiving');
        res.status(200).send('Here is the receiving number');
    })


    function get_POD(year, strBaseFedEx, pdfPath, a_callback) {
        console.log("CALLED GET_POD");
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
                get_POD(year-1, strBaseFedEx, pdfPath, a_callback);
            })
    
    }

    //function parse_pdf()
    function parse_POD(pdfPath, a_callback) {
        console.log("CALLED PARSE_POD");
        var dataBuffer = fs.readFileSync(pdfPath);
        pdf(dataBuffer) // async
            .then(data => {
                console.log("THis is the data", data)
                if (data) {
                    a_callback(data.text);
                    text = data.text;
                } else {
                    var err = {message: "We dont have a good pdf"};
                    throw err;
                }
            }).catch(err => {
                // We got a bad pdf                
                console.log("This is the err:", err)
                a_callback(null, true);
            });
    }

    function pull_Data(a_dataText) {
        //console.log("CALLED PULL_DATA");
        text = a_dataText.toLowerCase().match(/(:+|[a-z]+|\S+)/gi);
        //variables
        var TrackingNumber;
        var Reference;
        var Status;
        var DeliveryLocation;
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
                    if(text[i+1] != "or" ) {
                    ShipCity = text[i+5].substr(2);
                    ShipState = text[i+7].toUpperCase();
                    ShipCountry = text[i+8].toUpperCase();
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
        return sql;
    }
    function get_TrackingNumber(text, i) {
        return text[i+3].replace('ship', '');
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
        return text[i + 1].replace( 'number' , '').toUpperCase() + text[i + 2].replace( '#' , '').toUpperCase();
        
    };
    function convert_Date(text1) {
        switch(text1) {
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
