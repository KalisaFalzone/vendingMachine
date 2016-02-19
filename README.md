#### Vending Machine Application built with Node

###Getting Started
Note: you must have node installed on your computer

####Install the dependencies:
```sh
npm install
```
This give you all the node modules you will need as well as the Moca test suite

####Run the tests
 ```sh
npm test
```

###Using the application

You will need to replace the following two files with your own information:

1. items.txt

This should be a text file in the format:

```
item,cost
Pepsi,0.75
Fanta,0.75
Snickers,1.25
Twix,1.00
Apple,0.50
```

This describes the items being loaded into the vending machine. The vending machine can hold 10 of each item

2. customer.txt

This should be a text file in the format:

```
itemNumber,cash
1,2.00
14,5.75
10,5.03
2,0.25
1,2.00
```

This describes the item number customers would like to buy and the dollar amount they supplied (only allowed to accept $1, $5 and 0.25 denominations)

to run the program from the main directory:
 ```sh
node app.js
```

This will create a output.txt file in the main directory.

This file has line items describing each transaction. Example output:

```
Success, 1.25
Success, 3.75
Invalid denomination
Insufficient funds
Success, 1.25
```



