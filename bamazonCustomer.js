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
    printItems();
});
function printItems() {
    var query = 'SELECT item_id, product_name, price FROM `products`';
    connection.query(query, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} // ${res[i].product_name}: $${res[i].price}`);

        }
        console.log('------------------------------------------------------------');
        prompt();
    });
}

function prompt() {
    inquirer
        .prompt({
            name: "selectProduct",
            message: "Enter ID Number of item you'd like to purchase"
        })
        .then((response) => {
            var itemSelect = response.selectProduct;
            inquirer
                .prompt({
                    name: "quantity",
                    message: "How many would you like to purchase"
                })
                .then((response) => {
                    var quantity = response.quantity;
                    checkInventory(itemSelect, quantity);
                });
        });
}

function checkInventory(id, quant) {
    var query = `SELECT price, stock_quantity FROM products WHERE item_id = ${id}`;
    connection.query(query, (err, res) => {
        var stock = res[0].stock_quantity;
        var stockLeft = stock - quant;
        var price = res[0].price;
        // console.log(stock);

        if (stockLeft >= 0) {
            updateInventory(id, stockLeft);
            console.log(`Great Purchase! Your total is $${price * quant}`);
        }
        else console.log(`INSUFFICIENT QUANTITY! ONLY ${stock} UNITS AVAILABLE`);

        return console.log('------------------------------------------------------------');
    });
}

function updateInventory(id, stockLeft) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stockLeft
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            returnToMenu();
        }
    );
    // logs the actual query being run
    //   console.log(query.sql);  
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
                printItems();
            }
            else if (answer.return === 'No') {
                console.log('------------------------------------------------------------');
                console.log(' ');
                process.exit();
            }
        });
}