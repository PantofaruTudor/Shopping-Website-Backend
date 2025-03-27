require('dotenv').config()
const mongoose =  require('mongoose')

const Product = require('../front&backend/models/schema')
const connectDB = require('../front&backend/db/connect_database')

mongoose.connectDB(process.env.MONGO_URI)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err).console.error('Error connecting to MongoDB',err))
