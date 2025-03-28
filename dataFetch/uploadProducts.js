//THIS IS WHERE I POPULATE THE DATABASE WITH INFO

require('dotenv').config()
const Product = require('../front&backend/models/schema')
const connectDB = require('../front&backend/db/connect_database')
const jsonProducts1 = require('./products.json')
const jsonProducts2 = require('../front&backend/products.json')

// connectDB(process.env.MONGO_URI)
//     .then(()=> console.log('Connected to MongoDB'))
//     .catch((err)=> console.error('Error connecting to MongoDB',err))

const populating = async()=> {
    try{
        await connectDB(process.env.MONGO_URI)
        const result = await Product.deleteMany({})
        console.log("success")
        await Product.create(jsonProducts)
        console.log("succes si a doua oare")
        return
    }
    catch(error)
    {
        console.log(error)
        return 
    }
}

populating()