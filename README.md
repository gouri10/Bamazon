# Project Title
Bamazon

# Project Description
Amazon-like storefront.
It will take in orders from customers and deplete stock from the store's inventory.

# Getting Started
clone the GitHub repository https://github.com/gouri10/Bamazon to your computer using the below command
git clone git@github.com:gouri10/Bamazon.git

# Prerequisites
## Create a MySQL Database called `bamazon` and Insert mock data
For the above things please run products.sql and seeds.sql files in sql workbench

# Installation
##Navigate to the root of the application and Run the below command to install all npm packages

npm install 


# Running the tests
node bamazonCustomer.js  and view th products
![Sample-Output](images\bamazonCustomerOutput.PNG)

node bamazonManager.js   and order the product
![Sample-Output](images\BamazonCustomerOrderOutput.PNG)

node bamazonManager.js  and order some product with quantity more than the avaiabke quantity
![Sample-Output](images\bamazonCustomerInsufficientOrder.png)

## Manager View
node bamazonManager.js   and choose View Products for Sale option
![Sample-Output](images\ManagerViewProducst.png)

node bamazonManager.js   and choose View Low Inventory option
![Sample-Output](images\ManagerNoInventory.PNG)

node bamazonManager.js   and choose Add to Inventory option
![Sample-Output](images\ManagerAddToInventory.PNG)

node bamazonManager.js   and choose Add New Product option
![Sample-Output](images\ManagerAddNewProduct.PNG)
  

# Built With
Node - The web framework
JQuery -Web Scripting

# Authors
Gouri peddinti :- Developer

# License
This project is licensed under the ISC License

# Acknowledgments
Hat tip to anyone whose code was used


