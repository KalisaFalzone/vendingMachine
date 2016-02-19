var calcs = require('../../helpers/calculations.js');
var convertData = require('../../helpers/convertData.js');
var assert = require('assert');

describe('coverting data to json tests', function() {

  it('the first element in vendingMachineItems should be an empty object and the vendingMachineItems Array should have 16 items', function () {
    return convertData.loadVendingMachine('test/testData/testItems.txt')
    .then(function(data) {
      assert.equal(Object.keys(data[0]).length, 0);
      assert.equal(data.length, 16)
    });
  })

  it ('the customer orders should have length 20 and spot checking data', function() {
    return convertData.lineUpCustomers('test/testData/testCustomer.txt')
    .then(function(data) {
      console.log('data', data.customerOrders[5])
      assert.equal(data.customerOrders.length, 20);
      assert.equal(data.customerOrders[2].itemNumber, 10);
    });
  })

})

describe('isDenominationValid Tests', function() {

  it('isDenominationValid should fail for invalid input', function () {
    assert.equal(false, calcs.isDenominationValid(5.03));
  })

  it('isDenominationValid should succeed for even dollar amounts', function () {
    assert.equal(true, calcs.isDenominationValid(3));
  })

  it('isDenominationValid should suceed for a quarter', function () {
    assert.equal(true, calcs.isDenominationValid(0.25));
  })
  it('isDenominationValid should fail for negative numbers', function () {
    assert.equal(false, calcs.isDenominationValid(-1));
  })
})

describe('isEnoughCash Tests', function() {

  it('isEnoughCash should fail for invalid input', function () {
    assert.equal(false, calcs.isDenominationValid('cash', 'string'));
  })

  it('isEnoughCash should succeed for valid purchase', function () {
    assert.equal(true, calcs.isDenominationValid(3, 1.25));
  })

  it('isEnoughCash should suceed for valid purchase', function () {
    assert.equal(true, calcs.isDenominationValid(1, 0.25));
  })
  it('isEnoughCash should fail for negative numbers', function () {
    assert.equal(false, calcs.isDenominationValid(-1, -2));
  })
})

describe('getRemainder Tests', function() {

  it('getRemainder should calculate appropriately', function () {
    assert.equal('1.75', calcs.getRemainder(3, 1.25));
  })

  it('getRemainder should add .00 to the end of the string for even dollar amounts', function () {
    assert.equal('1.00', calcs.getRemainder(2, 1));
  })
  it('getRemainder should add 0. to the front of cents', function () {
    assert.equal('0.25', calcs.getRemainder(1, 0.75));
  })
})