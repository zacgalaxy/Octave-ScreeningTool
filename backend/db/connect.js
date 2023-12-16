// Set up connection to the database
const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDB