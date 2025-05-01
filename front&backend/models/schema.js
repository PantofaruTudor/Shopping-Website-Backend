// const mongoose = require('mongoose')

// const productSchema = new mongoose.Schema({
//     //_id:Number,
//     name:{
//         type:String,
//         //required:true
//     },
//     brand:{
//         type:String,
//         //required:true
//     },
//     color:{
//         type:String,
//         default: "Unknown"
//     },
//     price:{
//         type:Number,
//         //required:true
//     },
//     sizes: {
//         type:[Number],
//         default: []
//     },
        
//     stock: {
//         type:Number,
//         default:0
//     },
//     images: {
//         type: [String],
//         default: []
//     },
//     sale: {
//         type:Boolean,
//         default:false
//     },
//     upcoming:{
//         type:Boolean, 
//         default: false
//     }
// })

// module.exports = mongoose.model('Products', productSchema)


module.exports = (connection) => {
    const mongoose = require('mongoose');

    // Product Schema
    const productSchema = new mongoose.Schema({
        name: { type: String },
        brand: { type: String },
        color: { type: String, default: "Unknown" },
        price: { type: Number },
        sizes: { type: [Number], default: [] },
        stock: { type: Number, default: 0 },
        images: { type: [String], default: [] },
        sale: { type: Boolean, default: false },
        upcoming: { type: Boolean, default: false },
    });

    // User Schema
    const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    });

    // Return models tied to the specific connection
    return {
        Product: connection.models.Product || connection.model('Product', productSchema),
        User: connection.models.User || connection.model('User', userSchema),
    };
};