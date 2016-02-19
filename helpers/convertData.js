var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Converter = require("csvtojson").Converter;
var calcs = require('./calculations.js');
var convertData = module.exports = {}

//Example vendingMachineItems: [{item: "sprite", cost: 1.00, quantity: 10}]
convertData.loadVendingMachine = function (path) {
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
convertData.lineUpCustomers = function(path, vendingMachineItems) {
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

//creates data for output.txt file
convertData.customersPurchase = function(vendingMachineItems, customerOrders) {
  var results = [];
  customerOrders.forEach(function(order) {
    if (!calcs.isDenominationValid(order.cash, vendingMachineItems)){
      results.push("Invalid denomination");
    } else if (!calcs.isEnoughCash(order.cash, vendingMachineItems[order.itemNumber].cost)) {
      results.push('Insufficient funds');
    } else if (vendingMachineItems[order.itemNumber].quantity === 0) {
      results.push('Out of ' + vendingMachineItems[order.itemNumber].item);
    } else {
      var remainder = calcs.getRemainder(order.cash, vendingMachineItems[order.itemNumber].cost)
      vendingMachineItems[order.itemNumber].quantity--;
      results.push("Success, " + remainder);
    }
  })
  return results.join('\n');
}