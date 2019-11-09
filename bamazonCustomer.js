var mysql = require("mysql");
var inquirer = require("inquirer");
var asTable = require ('as-table')

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "yourRootPassword",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start(){

    var query = connection.query("select * from products", function (err, res) {
        if (err) throw err;
        console.log(asTable.configure ({ delimiter: ' | ' }) (res));
        
    });

    // logs the actual query being run
    console.log(query.sql);
    connection.end();
}

