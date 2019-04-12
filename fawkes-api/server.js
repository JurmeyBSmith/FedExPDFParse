const express = require('express');
var mysql = require('mysql')
const bodyParser = require('body-parser');

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
const port = 3030;
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'foo',
  password: 'bar',
  port: '8889',
  database: 'test'
})

require("./routes/receiving")(app, connection);

connection.connect((err) => {
  console.log('Are we even running this?')
  if (err) {
    console.log('Database error:', err);
    throw err
  } else {
    console.log('You are now connected...');
    var sql = "CREATE TABLE IF NOT EXISTS test (id int)";
    sql = "TRUNCATE TABLE test";
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
app.listen(port, () => console.log(`Example app listening on port ${port}!`))