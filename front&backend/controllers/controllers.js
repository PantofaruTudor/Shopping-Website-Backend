const Product = require('../models/schema')

const getAllProducts = async(req,res, next) =>{
    const {page = 1, limit = 12} =  req.query
    try{
        const products = await Product.find({})
            .skip((page-1)*limit)
            .limit(Number(limit))
            .select('name brand price images')
        const productsLength = await Product.countDocuments()
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

const getProducts = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    try {
        const products = await Product.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// const getPaginatedItems = async(req,res) =>{
//     try{
//         const limit = 6
//         const {page} = req.query
//         const skip = (page-1)*limit
//         const items = await Product.find().skip(skip).limit(Number(limit))
//         res.status(200).json({
//             items,page
//         })
//         //TREBUIE SA COMMBINI FUNCTIA ASTA CU GETALLPRODUCTS
//     }
//     catch(error)
//     {
//         res.status(404).error("problems with items pages")
//     }
// }


const itemInsert = (req,res) => {
    console.log('asta e')
    res.status(404).send('Not yet finished')
}




module.exports = {getAllProducts,getProducts, itemInsert}