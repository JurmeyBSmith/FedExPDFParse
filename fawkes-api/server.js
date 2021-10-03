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
require("./routes/receivingv2")(app, connection);
require("./routes/databaseInit")(app, connection);

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


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
