const xlsx = require('xlsx');

/**
 * 
 * @param {String} filePath - The absolute file path to the excel file
 * @returns {JSON} ColumnName: Data in JSON format
 */
function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])

    return data
}

module.exports = { readExcelFile }