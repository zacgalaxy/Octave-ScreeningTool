const mongoose = require('mongoose');

/**
 * Schema which dictate the way data will be stored in the database
 */
const FinancialSchema = mongoose.Schema({
    ticker: String,
    name: String,
    industry: String,
    sector:String,
    country: String, 
    financialRatios: {
        returnOnInvestedCapital: mongoose.Schema.Types.Mixed,
        epsGrowth: mongoose.Schema.Types.Mixed,
        revenueGrowth: mongoose.Schema.Types.Mixed,
        peRatio: mongoose.Schema.Types.Mixed,
        returnOnAssets: mongoose.Schema.Types.Mixed,
        returnOnEquity: mongoose.Schema.Types.Mixed,
        currentRatio: mongoose.Schema.Types.Mixed,
        assetTurnover: mongoose.Schema.Types.Mixed,
        profitMargin: mongoose.Schema.Types.Mixed,
        evToEbitda: mongoose.Schema.Types.Mixed,
        returnOnCapitalEmployed: mongoose.Schema.Types.Mixed,
        priceToBookValue: mongoose.Schema.Types.Mixed,
        freeCashFlow: mongoose.Schema.Types.Mixed,
        netIncome: mongoose.Schema.Types.Mixed,
        freeCashFlowRealisation: mongoose.Schema.Types.Mixed,
        totalDebt: mongoose.Schema.Types.Mixed,
        totalEquity: mongoose.Schema.Types.Mixed,
        debtToEquity: mongoose.Schema.Types.Mixed,
        cashFlowToDebtRatio: mongoose.Schema.Types.Mixed,
        price: mongoose.Schema.Types.Mixed,
        eps: mongoose.Schema.Types.Mixed
    }
})

module.exports = FinancialSchema;