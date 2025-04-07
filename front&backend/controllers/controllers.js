const Product = require('../models/schema')

const getAllProducts = async(req,res, next) =>{
    const {page = 1, limit = 12, brand,price, sort} =  req.query
    try{
        const query = {}
        if(brand)
        {
            const brandArray = brand.split(',')
            query.brand = { $in: brandArray}
        }
        
        if(price){
            const [minPrice,maxPrice] = price.split('-').map(Number)
            query.price = {$gte:minPrice,$lte:maxPrice}
        }

        let sortOrder = {};
        if (sort === 'price-asc') {
            sortOrder.price = 1; // Sort by price in ascending order
        } else if (sort === 'price-desc') {
            sortOrder.price = -1; // Sort by price in descending order
        } else if (sort === 'release-date-asc') {
            sortOrder.releaseDate = 1; // Sort by release date in ascending order
        } else if (sort === 'recommended') {
            sortOrder.recommended = -1; // Example: Sort by a "recommended" field
        }
        const products = await Product.find(query)
            .sort(sortOrder)
            .skip((page-1)*limit)
            .limit(Number(limit))
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