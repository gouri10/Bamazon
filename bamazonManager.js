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

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "managerAction",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
        })
        .then(function (choice) {
            // based on their answer, perform the action
            switch (choice.managerAction) {

                case "View Products for Sale":
                    viewProducts();                   
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    AddToInventory();
                    break;
                case "Add New Product":
                    AddNewProduct();
                    break;
                case "EXIT":
                    connection.end();
                    break;
            }

        });
}

function viewProducts() {
    var query = connection.query("select * from products", function (err, res) {
        if (err) throw err;
        console.log(asTable.configure({ delimiter: ' | ' })(res));
        console.log("\n");
        start();
    });
}

function viewLowInventory() {
    var query = connection.query("select * from products where stock_quantity < 5", function (err, res) {
        if (err) throw err;
        if (res.length > 0) {
            console.log(asTable.configure({ delimiter: ' | ' })(res));            
        }
        else {
            console.log("\n NO LOW INVENTORY!\n");
        }        
        start();
    });
}


function AddToInventory() {
    var query = connection.query("select * from products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "for_item_id",
                    type: "list",
                    message: "Enter the id of the product, for which you want to add to inventory\n",
                    choices: res.map(x => x.item_id)

                },
                {
                    name: "add_item_quantity",
                    type: "input",
                    message: "Enter the quantity of the product to add to inventory\n"
                }
            ]).then(function (answer) {
                
                var product = res.find(x => x.item_id === answer.for_item_id);               

                //update the product
                var quantity = parseInt(product.stock_quantity) + parseInt(answer.add_item_quantity);
                console.log("Updating the stock quantity to: " + quantity +" \n");

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: quantity
                        },
                        {
                            item_id: answer.for_item_id
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        // console.log(res.affectedRows + " products updated!\n");
                        console.log("Your product was updated successfully!");
                        start();
                    }
                );                

            });
    });
}

function AddNewProduct() {
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "What is the name of the product you would like to add?"
            },
            {
                name: "departmentName",
                type: "input",
                message: "What is the department of the above product?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the above product?"
            },
            {
                name: "quantity",
                type: "input",
                message: "What is the quantity available of the above product?"
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert a new product into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.productName,
                    department_name: answer.departmentName,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was created successfully!");
                    start();
                }
            );
        });

}


