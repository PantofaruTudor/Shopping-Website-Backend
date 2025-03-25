const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id:Number,
    name:{
        type:String 
    },
    brand:{
        type:String 
    },
    color:{
        type:String 
    },
    price:{
        type:Number
    },
    sizes: [Number],
    stock: Number,
    images: [String],
    sale: {
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Products', productSchema)