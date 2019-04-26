// //INCLUDES
// const axios = require('axios');
// const fs = require('fs');
// const pdf = require('pdf-parse');

// module.exports = (app, connection) => {
    
//     //testof link sub
//     trackingNumber = trkNm;
//      var pdfPath = "routes/pdfFiles/" + trackingNumber + ".pdf";
//     var strBaseFedEx = "https://www.fedex.com/trackingCal/retrievePDF.jsp?trackingNumber=" + trackingNumber + "&trackingQualifier=12019~" + trackingNumber + "~FDEG&trackingCarrier=FDXG&shipDate=&destCountry=&locale=en_US&accountNbr=148750947&type=SPOD&appType=&anon=";
//     let dataBuffer = fs.readFileSync(pdfPath);

//     // app.get('/pdf', (req, res) => {
//     // var pdfUtil = require('pdf-to-text');
//     // var pdf_path = "./retrievePDF.pdf";

//     // pdfUtil.info(pdf_path, function(err, info) {
//     //     if (err) throw(err);
//     //     console.log(info);
//     //   });
//     // });

//     app.get('/api/pdf', (req, res) => {
        
//         //trackingNumber = trkNm;
//         console.log("TrackingNumber: "+trkNm)
//         // var pdfPath = "routes/pdfFiles/" + trackingNumber + ".pdf";
//         // let dataBuffer = fs.readFileSync(pdfPath);
//         // var strBaseFedEx = "https://www.fedex.com/trackingCal/retrievePDF.jsp?trackingNumber=" + trackingNumber + "&trackingQualifier=12019~" + trackingNumber + "~FDEG&trackingCarrier=FDXG&shipDate=&destCountry=&locale=en_US&accountNbr=148750947&type=SPOD&appType=&anon=";
//         //let dataBuffer = fs.readFileSync(pdfPath);
//         // console.log("pdfPath inside app.get 1 = "+pdfPath);
//         // console.log("Tracking number in app.get 1 = " +trackingNumber);
//         // console.log("Str Base FEDEX = " +strBaseFedEx);
//         var sql = `SELECT \`tracking_number\` FROM \`shipment\` WHERE \`shipment\`.\`reference_number\` = "r3f3r3nc3numb3r"`;
//         connection.query(sql, function (err, result) { // async request
//             if (err) throw err;
//             console.log("GET request within trackingnumber.js app.get api/pdf")
//             console.log('The results are: ', result);
//             // console.log(JSON.stringify(queriedid));    //{"id":"007","name":"James Bond"}
//             for (var i = 0; i < result.length; i++) {
//                 if (result[i].hasOwnProperty("tracking_number")) {
//                     trackingNumber = result[i].tracking_number;
//                     console.log("**********************This is the link*********************");
//                     console.log("trackingNumber = " + trackingNumber);
//                     strBaseFedEx = "https://www.fedex.com/trackingCal/retrievePDF.jsp?trackingNumber=" + trackingNumber + "&trackingQualifier=12019~" + trackingNumber + "~FDEG&trackingCarrier=FDXG&shipDate=&destCountry=&locale=en_US&accountNbr=148750947&type=SPOD&appType=&anon=";

//                 }
//             }
//             //console.log(strBaseFedEx);
            
//         });
//         pdfPath = "routes/pdfFiles/" + trackingNumber + ".pdf";
//         dataBuffer = fs.readFileSync(pdfPath);
//         strBaseFedEx = "https://www.fedex.com/trackingCal/retrievePDF.jsp?trackingNumber=" + trackingNumber + "&trackingQualifier=12019~" + trackingNumber + "~FDEG&trackingCarrier=FDXG&shipDate=&destCountry=&locale=en_US&accountNbr=148750947&type=SPOD&appType=&anon=";
        

//         res.send("PDF PARSED!!!")
//         get_data(strBaseFedEx, trackingNumber, pdfPath);
//         console.log("pdfPatch = " +pdfPath)
//         pdf(dataBuffer).then(function (data) {

//             // number of pages
//             console.log(data.numpages);
//             // number of rendered pages
//             console.log(data.numrender);
//             // PDF info
//             console.log(data.info);
//             // PDF metadata
//             console.log(data.metadata);
//             // PDF.js version
//             // check https://mozilla.github.io/pdf.js/getting_started/
//             console.log(data.version);
//             // PDF text
//             console.log(data.text);


            
//             //get_data(strBaseFedEx, trackingNumber, pdfPath);
            
//         });
        
//     })
// }

// //POST
// //app.post('/api/CORRECTURL', (req, res, args) => {

//     //get the data 



//     // check for bad data


// //})

// //Function GETDATA

// function get_data(strBaseFedEx, trackingNumber, pdfPath){

//     var URL = strBaseFedEx;
//     //pdfPath.open("w");
//     const file = fs.createWriteStream(pdfPath);
//     axios({ // async
//         method: 'get',
//         url: URL,
//         responseType: 'stream'
//     })
//     .then( response => {
//         response.data.pipe(file);
//     }).catch(err => {
//         console.log(err)
//     })
// // .then(data =>fs.writeFile('routes/savedPDF.pdf', data.jsp, (err) =>{
// //     if (err) throw err;
// // }) )
// // .catch(err=>console.log(err))










// // fh = fopen(getScriptPath(pdfPath), 0);
// // if(fh!=-1){
// //     length = flength(fh); // Get the length of the file
// //     str = fread(fh, length); // Read in the entire file
// //     fclose(fh); // Close the file

// //     // Display the contents of the file

// //     write(str);
// // }   else{
// //     console.log("ERROR WITH READING");
// // }   

// }

// //Function PARSE_POD


// //Function GET_ADDRESS_NEW


// //Function GET_REFERENCE


// //Function GET_DATE


// //Function CONVERT_ADDRESS


// //Function GET_ADDRESS


// //Function LOAD_FEDEX_PAGE











