const mongoose = require('mongoose');
const FinancialSchema = require('../financialSchema');

module.exports = mongoose.model('EMEA', FinancialSchema, 'EMEA');