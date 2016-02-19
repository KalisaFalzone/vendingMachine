var helpers = require('../../helpers.js')
var assert = require('assert')

describe('isDenominationValid Tests', function() {

  it('isDenominationValid should fail for invalid input', function () {
    assert.equal(false, helpers.isDenominationValid(5.03));
  })

  it('isDenominationValid should succeed for even dollar amounts', function () {
    assert.equal(true, helpers.isDenominationValid(3));
  })

  it('isDenominationValid should suceed for a quarter', function () {
    assert.equal(true, helpers.isDenominationValid(0.25));
  })
  it('isDenominationValid should fail for negative numbers', function () {
    assert.equal(false, helpers.isDenominationValid(-1));
  })
})

describe('isEnoughCash Tests', function() {

  it('isEnoughCash should fail for invalid input', function () {
    assert.equal(false, helpers.isDenominationValid('cash', 'string'));
  })

  it('isEnoughCash should succeed for valid purchase', function () {
    assert.equal(true, helpers.isDenominationValid(3, 1.25));
  })

  it('isEnoughCash should suceed for valid purchase', function () {
    assert.equal(true, helpers.isDenominationValid(1, 0.25));
  })
  it('isEnoughCash should fail for negative numbers', function () {
    assert.equal(false, helpers.isDenominationValid(-1, -2));
  })
})

describe('getRemainder Tests', function() {

  it('getRemainder should calculate appropriately', function () {
    assert.equal('1.75', helpers.getRemainder(3, 1.25));
  })

  it('getRemainder should add .00 to the end of the string for even dollar amounts', function () {
    assert.equal('1.00', helpers.getRemainder(2, 1));
  })
  it('getRemainder should add 0. to the front of cents', function () {
    assert.equal('0.25', helpers.getRemainder(1, 0.75));
  })
})