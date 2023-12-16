const mongoose = require('mongoose');
const FinancialSchema = require('../financialSchema');

module.exports = mongoose.model('Latin America', FinancialSchema, 'Latin America');