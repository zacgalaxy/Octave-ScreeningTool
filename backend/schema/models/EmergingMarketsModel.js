const mongoose = require('mongoose');
const FinancialSchema = require('../financialSchema');

module.exports = mongoose.model('Emerging Markets', FinancialSchema, 'Emerging Markets');