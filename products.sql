DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("diaper bag","Baby Products", 2.50, 100);

INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("t-shirt","woman clothing", 3.10, 120);

INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("strawberry jam","Food", 3.25, 75);

-- INSERT INTO products (product_name, department_name,price, quantity)
-- VALUES ("diaper bag","Baby Products", 2.50, 100);

-- INSERT INTO products (product_name, department_name,price, quantity)
-- VALUES ("t-shirt","woman clothing", 3.10, 120);

-- INSERT INTO products (product_name, department_name,price, quantity)
-- VALUES ("strawberry jam","Food", 3.25, 75);

-- INSERT INTO products (product_name, department_name,price, quantity)
-- VALUES ("diaper bag","Baby Products", 2.50, 100);

-- INSERT INTO products (product_name, department_name,price, quantity)
-- VALUES ("t-shirt","woman clothing", 3.10, 120);

-- INSERT INTO products (product_name, department_name,price, quantity)
-- VALUES ("strawberry jam","Food", 3.25, 75);

-- INSERT INTO products (product_name, department_name,price, quantity)
-- VALUES ("strawberry jam","Food", 3.25, 75);

