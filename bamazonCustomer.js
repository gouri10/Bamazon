var mysql = require("mysql");
var inquirer = require("inquirer");
var asTable = require('as-table')

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    var query = connection.query("select * from products", function (err, res) {
        if (err) throw err;
        console.log(asTable.configure({ delimiter: ' | ' })(res));

        inquirer
            .prompt([
                {
                    name: "buy_item_id",
                    type: "list",
                    message: "Enter the id of the product you want to buy",
                    choices: res.map(x => x.item_id)

                },
                {
                    name: "buy_item_quantity",
                    type: "input",
                    message: "Enter the quantity of the product"
                }
            ]).then(function (answer) {

                console.log(answer.buy_item_id + ": " + answer.buy_item_quantity);
                var product = res.find(x => x.item_id === answer.buy_item_id);
                console.log(product);

                if (product.stock_quantity >= answer.buy_item_quantity) {
                    //update the product
                    var quantity=product.stock_quantity-answer.buy_item_quantity;                    
                    console.log("Updating the stock quantity to: "+ quantity);
                    
                    var query=connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: quantity
                            },
                            {
                                item_id: answer.buy_item_id
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " products updated!\n");
                           
                        }
                    );

                    // logs the actual query being run
                    //console.log(query.sql);
                     console.log(query.sql);
                     connection.end();

                }
                else {
                    console.log("Insufficient quantity!");
                }
            });

    });

    // logs the actual query being run
    console.log(query.sql);
}

