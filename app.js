var items = {};

var checkAmount = function(amount) {
    if (!!(amount % .25)) {
        return false;
    } else {
        return true;
    }
}

var getRemainder = function(amount, number) {
    var cost = items[number].cost;
    if ( !((amount - cost ) % 1) ) {
        return JSON.stringify(amount - cost) + '.00';
    } else {
        return JSON.stringify(amount - cost);
    }
}

var items = {1:{item: "sprite", cost: 1.00}};

console.log(getRemainder(2.00, 1), "expect 1.00");