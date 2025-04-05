const Product = require('../models/schema')

const getAllProducts = async(req,res, next) =>{
    const {page = 1, limit = 12, brand, price } =  req.query
    try{
        const query = {}
        if(brand)
        {
            const brandArray = brand.split(',')
            query.brand = { $in: brandArray}
        }

        if(price){
            query.price = price
        }
        const products = await Product.find(query)
            .skip((page-1)*limit)
            .limit(Number(limit))
            .select('name brand price images')
        const productsLength = await Product.countDocuments(query)
        res.status(200).json({products,productsLength})
    }
    catch(error)
    {
        res.status(500).json({error:'Server error'})
    }
}
// const getItemsNumber = async(req,res, next) => {
//     try{
//         let products = await Product.find({}).select('name price brand') //o metoda noua pentru a cauta strict ce vrei
//         console.log(products.length, "getProducts")
//         return products
//     }
//     catch(error)
//     {
//         console.error("Error with the getProducts")
//     }


// }
 
const itemInsert = (req,res) => {
    console.log('asta e')
    res.status(404).send('Not yet finished')
}


module.exports = {getAllProducts, itemInsert}