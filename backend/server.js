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
                companyName: companyData["Company name"],
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
        const query = buildQuery(req.query);
        const financialData = await AMERModel.find(query);
        
        const meanMedianResult = calcMeanMedian(financialData)
        financialData.push({meanMedian: meanMedianResult});

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
        const query = buildQuery(req.query);
        const financialData = await EMEAModel.find(query);
        
        const meanMedianResult = calcMeanMedian(financialData)
        financialData.push({meanMedian: meanMedianResult});

        res.json({ success: true, data: financialData });
    } catch (error) {
        console.error(`Error fetching financial data: ${error.message}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})

/**
 * Function to calculate mean and median based on the financial data provided
 * 
 * @param {The financial data provided} financialData 
 * @returns {Mean and median result}
 */
function calcMeanMedian(financialData) {
    const epsGrowthValues = []
    const returnOnCapitalValues = [];
    const debtToEquityValues = [];

    financialData.forEach(data => {
        // Check if the financial ratios are numbers and not null or undefined
        if (!isNaN(data.financialRatios.epsGrowth)) {
            epsGrowthValues.push(data.financialRatios.epsGrowth);
        }
        if (!isNaN(data.financialRatios.returnOnCapital)) {
            returnOnCapitalValues.push(data.financialRatios.returnOnCapital);
        }
        if (!isNaN(data.financialRatios.debtToEquity)) {
            debtToEquityValues.push(data.financialRatios.debtToEquity);
        }
    });

    const meanResult = {
        epsGrowth: calculateMean(epsGrowthValues),
        returnOnCapital: calculateMean(returnOnCapitalValues),
        debtToEquity: calculateMean(debtToEquityValues)
    }

    const medianResult = {
        epsGrowth: calculateMedian(epsGrowthValues),
        returnOnCapital: calculateMedian(returnOnCapitalValues),
        debtToEquity: calculateMedian(debtToEquityValues)
    };

    return {meanResult, medianResult};
}

/**
 * Function to calculate mean value from an array of numeric values
 * 
 * @param {Array of numeric values} values 
 * @returns {Mean value}
 */
 function calculateMean(values) {
    if (values.length === 0) {
        return "NA";
    }
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
}

/**
 * Function to calculate median value from an array of numeric values
 * 
 * @param {Array of numeric values} values 
 * @returns {Median value}
 */
 function calculateMedian(values) {
    if (values.length === 0) {
        return "NA";
    }
    const sortedValues = values.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
        return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
    } else {
        return sortedValues[middleIndex];
    }
}

/**
 * Function to build the filter query for the database
 * 
 * @param {The geography} geography 
 * @param {Sector of the company} sector 
 * @returns 
 */
function buildQuery(inputQuery) {
    const { geography, sector } = inputQuery;

    const query = {};
    if (geography) query.geography = geography;
    if (sector) query.sector = sector;
    return query;
}

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