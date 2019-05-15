

module.exports = (app, connection) => {

    app.post('/dbmanagement/dbinit', (req, res) => {
        dbInit(connection, res);

    })
    function dbInit(connection, res){
        var table_name = "shipment";
        var sql = `CREATE TABLE IF NOT EXISTS test.${table_name} ( shipment_id INT(11) NOT NULL AUTO_INCREMENT , tracking_number TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , reference_number VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , store VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , street VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , state VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , zip VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , city VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , country VARCHAR(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , status VARCHAR(75) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , received_date TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , shipped_date TEXT CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL , PRIMARY KEY (shipment_id));`
        connection.query(sql, (err, result) => {
            if (err) {
                console.log("Error Creating ", table_name);
                res.status(200).send(err);
            }else{
            console.log("Successfully Created ", table_name)
            res.status(200).send(result);
            }
        })
    }


}
