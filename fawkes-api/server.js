const express = require('express');
var mysql = require('mysql')
const bodyParser = require('body-parser');
var axios = require('axios');
//var pdfUtil = require('pdf-to-text');

const app = express();
// allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const port = 3306;
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'test'
})

app.use(express.static('routes/pdfFiles'));
//require("./routes/receiving")(app, connection);
require("./routes/receivingv2")(app, connection);
require("./routes/databaseInit")(app, connection);
//require("./routes/trackingNumber")(app, connection);

connection.connect((err) => {
  console.log('Are we even running this?')
  if (err) {
    console.log('Database error:', err);
    throw err
  } else {
    console.log('You are now connected...');
    var sql = "CREATE TABLE IF NOT EXISTS test (id int)";
  
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  }
});

app.get('/', (req, res) => {
  res.send('AT /');
})

app.get('/id', function(req, res) {
  var sql = 'SELECT \`test\`.\`id\` FROM \`test\`';
  connection.query(sql, function (err, result) {
    res.send(result)
  });
  
})

app.post('/id', function (req, res) {
  var id = req.body.id;
  var sql = `INSERT INTO \`test\` (\`id\`) VALUES (${id});`
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Post request successful!");
    res.send('ID POSTED');
  });
})

app.delete('/id', function(req, res) {
  var id = req.body.id;
  var sql = `DELETE FROM test WHERE test.id = (${id})`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Delete request successful");
    res.send('DELETED');
  });
})


//get.axios test
// app.get('/axios', (req, res) => {
//   var URL = 'https://www.fedex.com/trackingCal/retrievePDF.jsp?trackingNumber=786292048841&trackingQualifier=12019~786292048841~FDEG&trackingCarrier=FDXG&shipDate=&destCountry=&locale=en_US&accountNbr=148750947&type=SPOD&appType=&anon=';
// axios.get(URL)
// .then(data=>console.log(data))
// .catch(err=>console.log(err))

// })
// //PDFTOTEXTEST
// app.get('/pdf', (req, res) => {
 
//   pdf(dataBuffer).then(function(data) {
 
//     // number of pages
//     console.log(data.numpages);
//     // number of rendered pages
//     console.log(data.numrender);
//     // PDF info
//     console.log(data.info);
//     // PDF metadata
//     console.log(data.metadata); 
//     // PDF.js version
//     // check https://mozilla.github.io/pdf.js/getting_started/
//     console.log(data.version);
//     // PDF text
//     console.log(data.text); 
      
//     console.log("This is the link");
//     console.log(strBaseFedEx);
// });

  // var pdfUtil = require('pdf-to-text');
  // var pdf_path = "routes/retrievePDF.pdf";
  

  // pdfUtil.info(pdf_path, function(err, data) {
  //   if (err) {
  //     console.log("Ther error was:", err);
  //     throw(err)
  //   } else {
  //     console.log(data); //print all text 
  //     res.send("completed the call;")
  //   }    
  // }).catch(function(err) {

  // });
//});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))