const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    //_id:Number,
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    color:{
        type:String,
        default: "Unknown"
    },
    price:{
        type:Number,
        required:true
    },
    sizes: {
        type:[Number],
        default: []
    },
        
    stock: {
        type:Number,
        default:0
    },
    images: {
        type: [String],
        default: []
    },
    sale: {
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Products', productSchema)