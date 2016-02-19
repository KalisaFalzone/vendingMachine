var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Converter = require("csvtojson").Converter;

//Example vendingMachineItems: [{item: "sprite", cost: 1.00, quantity: 10}]
function loadVendingMachine(path) {
  return new Promise(function(resolve, reject) {
    var converter = new Converter({});
    converter.fromFile(path, function(err, data) {
      if (err != null && err != "") {
        reject(err);
      } else {
         var vendingMachineItems = data;
        //each item starts with a quantity of 10
        vendingMachineItems.forEach(function(item) {
          item.quantity = 10;
        });
        // Placeholder for 0th item.
        vendingMachineItems.unshift({});
        resolve(vendingMachineItems);
      }
    })
  });
}

//Example customerOrders: [{itemNumber: 2, cash: 1.00, quantity: 10}]
function lineUpCustomers(path, vendingMachineItems) {
  return new Promise(function(resolve, reject) {
    var converter = new Converter({});
    converter.fromFile(path, function(err, data) {
      if (err != null && err != "") {
        reject(err);
      } else {
        var customerOrders = data;
        resolve({vendingMachineItems:vendingMachineItems, customerOrders: customerOrders});
      }
    });
  });
}

function isDenominationValid (amount) {
  return (amount % 0.25) === 0;
}

function isEnoughCash (cash, cost) {
  return cash >= cost;
}

function getRemainder (cash, cost) {
  if ( !((cash - cost ) % 1) ) {
    return JSON.stringify(cash - cost) + '.00';
  } else {
    return JSON.stringify(cash - cost);
  }
}

function customersPurchase(vendingMachineItems, customerOrders) {
  console.log('starting vending machine items', vendingMachineItems)
  customerOrders.forEach(function(order) {
    if (!isDenominationValid(order.cash, vendingMachineItems)){
      console.log("Invalid denomination");
    } else if (!isEnoughCash(order.cash, vendingMachineItems[order.itemNumber].cost)) {
      console.log('Insufficient funds');
    } else if (vendingMachineItems[order.itemNumber].quantity === 0) {
      console.log('Out of ', vendingMachineItems[order.itemNumber].item);
    } else {
      var remainder = getRemainder(order.cash, vendingMachineItems[order.itemNumber].cost)
      vendingMachineItems[order.itemNumber].quantity--;
      console.log("Success, " + remainder);
    }
  })
}

loadVendingMachine('items.txt')
.then(function(vendingMachineItems) {
  return lineUpCustomers('customer.txt', vendingMachineItems);
})
.then(function(result) {
  return customersPurchase(result.vendingMachineItems, result.customerOrders);
})

