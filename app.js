var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Converter = require("csvtojson").Converter;
var convertData = require('./helpers/convertData.js');

//async code promisified to reformat items.txt and customer.txt into json
convertData.loadVendingMachine('items.txt')
.then(function(vendingMachineItems) {
  return convertData.lineUpCustomers('customer.txt', vendingMachineItems);
})
//and then run through purchases to create the output file for transactions
.then(function(result) {
  var output = convertData.customersPurchase(result.vendingMachineItems, result.customerOrders);
  fs.writeFile('output.txt', output, function(err) {
    if(err) {throw err}
  })
})
