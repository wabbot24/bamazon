var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    menu();
});

function menu() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            // console.log(answer);
            switch (answer.menu) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProductQuery();
                    break;
            }
        });
}

function viewProducts() {
    console.log('------------------------------------------------------------');
    var query = 'SELECT item_id, product_name, price, stock_quantity FROM `products`';
    connection.query(query, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} // ${res[i].product_name}: $${res[i].price} // stock: ${res[i].stock_quantity}`);

        }
        console.log('------------------------------------------------------------');
        returnToMenu();
    });
}

function lowInventory() {
    console.log('------------------------------------------------------------');
    var query = 'SELECT item_id, product_name, price, stock_quantity FROM `products` WHERE stock_quantity < 5';
    connection.query(query, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} // ${res[i].product_name}: $${res[i].price} // stock: ${res[i].stock_quantity}`);

        }
        console.log('------------------------------------------------------------');
        returnToMenu();
    });
}

function addInventory() {
    console.log('------------------------------------------------------------');
    inquirer
        .prompt({
            name: "selectProduct",
            message: "Enter ID of product"
        })
        .then((response) => {
            var itemSelect = response.selectProduct;
            inquirer
                .prompt({
                    name: "quantity",
                    message: "How many are you adding?"
                })
                .then((response) => {
                    var quantity = response.quantity;
                    updateInventory(itemSelect, quantity);
                });
        });
}

function updateInventory(id, quant) {
    var stock;
    var query = `SELECT stock_quantity FROM products WHERE item_id = ${id}`;
    connection.query(query, (err, res) => {
        stock = res[0].stock_quantity;
        var updatequery = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: parseInt(quant) + parseInt(stock)
                },
                {
                    item_id: id
                }
            ],
            function (err, res) {
                // console.log(res);
            }
        );
        console.log(' ');
        console.log("UPDATED INVENTORY:");
        viewProducts();
        // logs the actual query being run
        // console.log(updatequery.sql);
    });
}

function addProductQuery() {
    inquirer
        .prompt([
            {
                name: "selectProduct",
                message: "Product name:",
                type: "input"
            },
            {
                name: "departmentName",
                message: "Department:",
                type: "input"
            },
            {
                name: "price",
                message: "Price:",
                type: "input",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock",
                message: "Stock Quantity:",
                type: "input",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.selectProduct,
                    department_name: answer.departmentName,
                    price: parseInt(answer.price),
                    stock_quantity: parseInt(answer.stock)
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    // Call viewProduct AFTER the INSERT completes to view updated product list
                    console.log("UPDATED INVENTORY:");
                    viewProducts();
                }
            );
        });
}

function returnToMenu() {
    inquirer
        .prompt({
            name: 'return',
            type: 'list',
            message: 'Return to Menu?',
            choices: ['Yes', 'No']
        })
        .then(function (answer) {
            // console.log(answer);
            if (answer.return === 'Yes') {
                console.log('------------------------------------------------------------');
                menu();
            }
            else if (answer.return === 'No') {
                console.log('------------------------------------------------------------');
                console.log(' ');
                process.exit();
            }
        });
}