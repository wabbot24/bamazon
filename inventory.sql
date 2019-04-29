DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL (10,2) NULL,
stock_quantity INT (10) NULL
);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Nic Cage Pillow Case', 'Nic Cage Memorabilia', 59.99, 10);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Nic Cage Tank Top', 'Nic Cage Memorabilia', 69.99, 15);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Nic Cage Tote Bag', 'Nic Cage Memorabilia', 39.99, 20);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Picolas Cage Gourmet Pickles', 'Nic Cage Memorabilia', 24.99, 30);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Nic Cage Fathead Sticker', 'Nic Cage Memorabilia', 79.99, 10);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Gone in 60 Seconds Replica 1967 Mustang Shelby GT 500', 'Nic Cage Memorabilia', 649999.99, 1);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Nic Cage Waffle Iron', 'Nic Cage Memorabilia', 49.99, 12);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Nic Cage Wigs (Variety 10 pack)', 'Nic Cage Memorabilia', 399.99, 8);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Nic Cage Cage (fits animals up to large badgers)', 'Nic Cage Memorabilia', 129.99, 5);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Nic Cage Honey Bee Farm Starter Kit', 'Nic Cage Memorabilia', 1299.99, 10);

SELECT * FROM products;
