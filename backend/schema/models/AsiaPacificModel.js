const mongoose = require('mongoose');
const FinancialSchema = require('../financialSchema');

module.exports = mongoose.model('Asia-Pacific', FinancialSchema, 'Asia-Pacific');