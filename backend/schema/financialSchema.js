const mongoose = require('mongoose');

/**
 * Schema which dictate the way data will be stored in the database
 */
const FinancialSchema = mongoose.Schema({
    ticker: String,
    companyName: String,
    industry: String,
    sector:String,
    geography: String, 
    country: String,
    marketCap: mongoose.Schema.Types.Mixed,
    financialRatios: {
        returnOnCapital: mongoose.Schema.Types.Mixed,
        epsGrowth: mongoose.Schema.Types.Mixed,
        revenueGrowth: mongoose.Schema.Types.Mixed,
        peRatio: mongoose.Schema.Types.Mixed,
        returnOnAssets: mongoose.Schema.Types.Mixed,
        returnOnEquity: mongoose.Schema.Types.Mixed,
        currentRatio: mongoose.Schema.Types.Mixed,
        assetTurnover: mongoose.Schema.Types.Mixed,
        profitMargin: mongoose.Schema.Types.Mixed,
        tevToEbitda: mongoose.Schema.Types.Mixed,
        priceToBookValue: mongoose.Schema.Types.Mixed,
        freeCashFlow: mongoose.Schema.Types.Mixed,
        netIncome: mongoose.Schema.Types.Mixed,
        freeCashFlowRealisation: mongoose.Schema.Types.Mixed,
        totalDebt: mongoose.Schema.Types.Mixed,
        debtToEquity: mongoose.Schema.Types.Mixed,
        cashFlowToDebtRatio: mongoose.Schema.Types.Mixed,
    }
})

module.exports = FinancialSchema;