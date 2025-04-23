const mongoose = require('mongoose')

const connectDB = (url) =>{
    try {
        const connection = mongoose.createConnection(url);
        console.log('MongoDB connection successful');
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw error;
    }
}

module.exports = connectDB