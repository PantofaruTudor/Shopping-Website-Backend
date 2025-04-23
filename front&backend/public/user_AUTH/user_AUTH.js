require('dotenv').config({path:'./public/user_AUTH/.env'})

const user_AUTH_database = async()=>{
    try{
        const connectDB = require('../../db/connect_database')
        console.log('Connecting to the user AUTH database...');
        await connectDB(process.env.MONGO_URI_USER)
        console.log('Connected to the user AUTH database')
    }
    catch{
        console.error('Error connecting to the user AUTH database')
        process.exit(1)
    }
}

module.exports = user_AUTH_database


