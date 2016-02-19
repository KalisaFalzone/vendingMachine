var exports = module.exports = {}

exports.isDenominationValid = function(amount) {
  return (amount % 0.25) === 0 && amount >= 0;
}

exports.isEnoughCash = function(cash, cost) {
  return cash - cost >= 0 && cost > 0;
}

exports.getRemainder = function(cash, cost) {

  var remainder = '';
  if (!((cash - cost ) % 1)) { remainder = '.00'; }

  return (cash - cost) + remainder;
}