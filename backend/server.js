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
const AMERModel = require('./schema/models/AMER');
const EMEAModel = require('./schema/models/EMEA');


const app = express();
app.use(express.json());


/**
 * API endpoint to send financial data to the database. 
 * 
 * Change filePath to the absolute file path to the excel file data and change the financial model based on region
 * 
 * It will create a new document in the database collection if the document does not exist or update it if it already exist 
 * based on the stock ticker of the document.
 */
app.post('/api/insert-financial-data', async (req, res) => {
    const filePath = '/Users/zhonghautang/Octave-ScreeningTool/backend/financial-data/AMER-Financials.xlsx';
    const excelData = readExcelFile(filePath);

    excelData.forEach(async (companyData) => {
        try {
            const financialData = {
                ticker: companyData["Exchange:Ticker"],
                name: companyData["Company name"],
                industry: companyData["Industry"],
                sector: "Financials",
                geography: companyData["Geography"],
                country: null,
                marketCap: companyData["Market Capitalization ($M)"],
                financialRatios: {
                    returnOnCapital: companyData["Return on Capital"],
                    epsGrowth: companyData["EPS growth"],
                    revenueGrowth: companyData["Revenue growth"],
                    peRatio: companyData["PE Ratio"],
                    returnOnAssets: companyData["Return on Assets"],
                    returnOnEquity: companyData["Return on equity"],
                    currentRatio: companyData["Current ratio"],
                    assetTurnover: companyData["Asset turnover"],
                    profitMargin: companyData["Profit margin"],
                    tevToEbitda: companyData["TEV/EBITDA"],
                    priceToBookValue: companyData["P/B"],
                    freeCashFlow: companyData["free cash flow"],
                    netIncome: companyData["net income"],
                    freeCashFlowRealisation: companyData["free cash flow realisation"],
                    totalDebt: companyData["total debt"],
                    debtToEquity: companyData["Debt to equity"],
                    cashFlowToDebtRatio: companyData["Cash flow to debt ratio"],
                }
            }

            // Find existing document based on ticker and update if it exist else create a new document
            const existingData = await AMERModel.findOneAndUpdate(
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
 * API endpoint to return the financial data for AMER region
 * 
 * Example usage: localhost:8000/api/AMER-get-financial-data?geography=United%20States%20and%20Canada&sector=Financials
 * 
 */
app.get('/api/AMER-get-financial-data', async (req, res) => {
    try {
        // Adust this based on what the frontend allow user to filter by
        const { geography, sector } = req.query;

        // Construct a query object based on the provided parameters, this will filter based on the query
        const query = {};
        if (geography) query.geography = geography;
        if (sector) query.sector = sector;

        const financialData = await AMERModel.find(query);

        res.json({ success: true, data: financialData });
    } catch (error) {
        console.error(`Error fetching financial data: ${error.message}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})

/**
 * API endpoint to return the financial data for EMEA region
 * 
 * Example usage: localhost:8000/api/EMEA-get-financial-data?geography=Europe&sector=Financials
 *
 */
 app.get('/api/EMEA-get-financial-data', async (req, res) => {
    try {
        // Adust this based on what the frontend allow user to filter by
        const { geography, sector } = req.query;

        // Construct a query object based on the provided parameters, this will filter based on the query
        const query = {};
        if (geography) query.geography = geography;
        if (sector) query.sector = sector;

        const financialData = await EMEAModel.find(query);

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