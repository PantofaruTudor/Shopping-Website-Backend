//HERE IS WHERE I CREATE THE DATABASE WITH ITEMS
require('dotenv').config()

const Products = require('./models/schema')
const connectDB = require('./db/connect_database')
const jsonProducts = require('./products.json')

const populating = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        const result = await Products.deleteMany({})
        console.log("success")

        jsonProducts.forEach((item)=>{
            const name = item.brand.charAt(0).toUpperCase() + item.brand.slice(1).toLowerCase()
            item.brand = name
        })
        //^ this is for the brands name

        jsonProducts.forEach((item)=>{
            const full_name = item.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()).join(" ")
            item.name = full_name
        })
        
        await Products.create(jsonProducts)
    }

    catch(error){
        console.log(error)
    }
}

populating()