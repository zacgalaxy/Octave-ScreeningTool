const mongoose = require('mongoose');
const FinancialSchema = require('../financialSchema');

module.exports = mongoose.model('Europe', FinancialSchema, 'Europe');