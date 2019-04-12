
module.exports = (app, connection) => {

    app.post('/api/receiving', function (req, res) {
        var id = req.body.trackingNumber;

        // make fedex request

        // parse the pod

        // insert into the database

        // send back the values we got
        var sql = `INSERT INTO \`test\` (\`id\`) VALUES (${id});`
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Post request successful!");
            res.send('ID POSTED');
        });
    })

    app.get('/api/receiving', (req, res) => {
        console.log('This is the get request from receiving');
        res.status(200).send('Here is the receiving number');
    })

  

}