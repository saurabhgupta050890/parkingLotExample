const calculateBill = (hours) => hours > 2 ? 10 + (hours - 2) * 10 : 10;

module.exports = calculateBill;