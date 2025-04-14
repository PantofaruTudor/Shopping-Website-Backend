//HERE IS WHERE I CREATE THE DATABASE WITH ITEMS
require('dotenv').config()

const Products = require('./models/schema')
const connectDB = require('./db/connect_database')
const jsonProducts = require('../dataFetch/products.json')

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
            jsonProducts[index].upcoming = true
        })
        //////////////////////////////////////////


        await Products.create(jsonProducts)
    }

    catch(error){
        console.log(error)
    }
}

populating()