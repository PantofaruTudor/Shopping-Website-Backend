//THIS IS WHERE I POPULATE THE DATABASE WITH INFO

require('dotenv').config()
const Product = require('../front&backend/models/schema')
const connectDB = require('../front&backend/db/connect_database')
const jsonProducts = require('./products.json')


// connectDB(process.env.MONGO_URI)
//     .then(()=> console.log('Connected to MongoDB'))
//     .catch((err)=> console.error('Error connecting to MongoDB',err))

const populating = async()=> {
    try{
        await connectDB(process.env.MONGO_URI)
        const result = await Product.deleteMany({})
        console.log("success")


         //Assign 7 random "upcoming" items
        const upcomingItems = new Set()
        while(upcomingItems.size<7)
        {
            const randomIndex = Math.floor(Math.random()* jsonProducts.length)
            upcomingItems.add(randomIndex)
        }
        upcomingItems.forEach((index)=>{
            jsonProducts[index].upcoming = true
        })

        //Assign 13 random "sale" items
        const saleItems = new Set()
        while(saleItems.size<13)
        {
            const randomIndex = Math.floor(Math.random()* jsonProducts.length)
            if(jsonProducts[randomIndex].upcoming!=true)
                saleItems.add(randomIndex)
        }
        saleItems.forEach((index)=>{
            jsonProducts[index].sale = true
        })
        //////////////////////////////////////////


        
        await Product.create(jsonProducts)
        console.log("succes si a doua oara")
        return
    }
    catch(error)
    {
        console.log(error)
        return 
    }
    finally{
        process.exit(0)
    }
}

populating()
