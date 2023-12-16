const mongoose = require('mongoose');
const FinancialSchema = require('../financialSchema');

module.exports = mongoose.model('North America', FinancialSchema, 'North America');