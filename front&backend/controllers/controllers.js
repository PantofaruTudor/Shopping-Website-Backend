// const Product = require('../models/schema')

// const getAllProducts = async(req,res,next) =>{
//     const {page, limit , brand,price, sort} =  req.query
//     try{
//         const query = {}
//         if(brand)
//         {
//             const brandArray = brand.split(',')
//             query.brand = { $in: brandArray}
//         }
        
//         if(price){
//             const [minPrice,maxPrice] = price.split('-').map(Number)
//             query.price = {$gte:minPrice,$lte:maxPrice}
//         }

//         let sortOrder = {};
//         if (sort === 'price-asc') {
//             sortOrder.price = 1; // Sort by price in ascending order
//         } else if (sort === 'price-desc') {
//             sortOrder.price = -1; // Sort by price in descending order
//         } else if (sort === 'release-date-asc') {
//             sortOrder.releaseDate = 1; // Sort by release date in ascending order
//         } else if (sort === 'recommended') {
//             sortOrder.recommended = -1; // Example: Sort by a "recommended" field
//         }
        
//         if (page) {
//             const limit = 12; // Set limit to 12 if page is defined
//             const skip = (page - 1) * limit;
//             products = await Product.find(query)
//                 .sort(sortOrder)
//                 .skip(skip)
//                 .limit(limit);
//         } else {
//             // Fetch all products if page is undefined
//             products = await Product.find(query).sort(sortOrder);
//         }
//         const productsLength = await Product.countDocuments(query)
//         res.status(200).json({products,productsLength})
//     }
//     catch(error)
//     {
//         console.error('Error in getAllProducts:', error.message)
//         console.error(error.stack)

//         res.status(500).json({error:'Server error'})
//     }
// }

// module.exports = {getAllProducts, itemInsert}

module.exports = (Product) => {
    const getAllProducts = async (req, res, next) => {
        const { page, limit, brand, price, sort } = req.query;
        try {
            console.log('Received request')
            const query = {};
            if (brand) {
                const brandArray = brand.split(',');
                query.brand = { $in: brandArray };
            }

            if (price) {
                const [minPrice, maxPrice] = price.split('-').map(Number);
                query.price = { $gte: minPrice, $lte: maxPrice };
            }

            let sortOrder = {};
            if (sort === 'price-asc') {
                sortOrder.price = 1; // Sort by price in ascending order
            } else if (sort === 'price-desc') {
                sortOrder.price = -1; // Sort by price in descending order
            }

            let products;
            if (page) {
                const limit = 12; // Set limit to 12 if page is defined
                const skip = (page - 1) * limit;
                products = await Product.find(query)
                    .sort(sortOrder)
                    .skip(skip)
                    .limit(limit);
            } else {
                // Fetch all products if page is undefined
                products = await Product.find(query).sort(sortOrder);
            }

            const productsLength = await Product.countDocuments(query);
            res.status(200).json({ products, productsLength });
        } catch (error) {
            console.error('Error in getAllProducts:', error.message);
            console.error(error.stack);

            res.status(500).json({ error: 'Server error' });
        }
    };

    return { getAllProducts };
};