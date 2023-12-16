// Required to access .env file data
require('dotenv').config();

/** 
 * Import the required files to start the server and connect to the database
 */
const express = require('express');
const connectDB = require('./db/connect');

/**
 * Import functions from services
 */
const { readExcelFile } = require('./services/readExcelService');

/**
 * Import the financial schema for different regions which dictate how data is stored in the database
 */
const NorthAmericaModel = require('./schema/models/NorthAmericaModel');
const AsiaPacificModel = require('./schema/models/AsiaPacificModel');
const EmergingMarketsModel = require('./schema/models/EmergingMarketsModel');
const EuropeModel = require('./schema/models/EuropeModel');
const LatinAmericaModel = require('./schema/models/LatinAmericaModel');
const MiddleEastAndAfricaModel = require('./schema/models/MiddleEastAndAfricaModel');


const app = express();
app.use(express.json());


/**
 * API endpoint to send financial data to the database. 
 * User need to make a POST request to the API endpoint to use it.
 * Change filePath to the absolute file path to the excel file data
 * 
 * It will create a new document in the database collection if the document does not exist or update it if it already exist 
 * based on the stock ticker of the document.
 * 
 * Currently applicable to the North America region only
 */
app.post('/api/insert-financial-data', async (req, res) => {
    const filePath = '/Users/zhonghautang/Octave-ScreeningTool/backend/financial-data/US-Financial.xlsx';
    const excelData = readExcelFile(filePath);

    excelData.forEach(async (companyData) => {
        try {
            const financialData = {
                ticker: companyData["Ticker"],
                name: null,
                industry: "Financials",
                sector: null,
                country: "USA",
                financialRatios: {
                    returnOnInvestedCapital: companyData["Return on Invested Capital"],
                    epsGrowth: companyData["EPS growth"],
                    revenueGrowth: companyData["Revenue growth"],
                    peRatio: companyData["PE Ratio"],
                    returnOnAssets: companyData["Return on Assets"],
                    returnOnEquity: companyData["Return on equity"],
                    currentRatio: companyData["Current ratio"],
                    assetTurnover: companyData["Asset turnover"],
                    profitMargin: companyData["Profit margin"],
                    evToEbitda: companyData["EV/ EBITDA"],
                    returnOnCapitalEmployed: companyData["Return on capital employed"],
                    priceToBookValue: companyData["p/bv"],
                    freeCashFlow: companyData["free cash flow"],
                    netIncome: companyData["net income"],
                    freeCashFlowRealisation: companyData["free cash flow realisation"],
                    totalDebt: companyData["total debt"],
                    totalEquity: companyData["Total equity"],
                    debtToEquity: companyData["Debt to equity"],
                    cashFlowToDebtRatio: companyData["Cash flow to debt ratio"],
                    price: companyData["Price"],
                    eps: companyData["EPS"]
                }
            }

            // Find existing document based on ticker and update if it exist else create a new document
            const existingData = await NorthAmericaModel.findOneAndUpdate(
                { ticker: financialData.ticker },
                financialData,
                { new: true, upsert: true }
            );
        } catch (error) {
            console.error(`Error inserting data for ${companyData["US-Financials Correct"]}: ${error.message}`);
        }
    })
    res.send("Successfully inserted all data");
})

/**
 * API endpoint to return the financial data from the database
 * 
 * Example usage: /api/get-financial-data?country=USA&industry=Financials
 * 
 * Currently applicable to the North America region only
 */
app.get('/api/get-financial-data', async (req, res) => {
    try {
        // Adust this based on what the frontend allow user to filter by
        const { country, industry } = req.query;

        // Construct a query object based on the provided parameters, this will filter based on the query
        const query = {};
        if (country) query.country = country;
        if (industry) query.industry = industry;

        const financialData = await NorthAmericaModel.find(query);

        res.json({ success: true, data: financialData });
    } catch (error) {
        console.error(`Error fetching financial data: ${error.message}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})

/**
 * Establish database connection and start the server locally.
 * You can access the website at localhost:8000
 */
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(8000, "0.0.0.0", () => {
            console.log("Server is listening on port 8000");
        })
    } catch (error) {
        console.log(error);
    }
}

start();