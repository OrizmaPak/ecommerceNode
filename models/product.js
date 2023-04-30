const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please product name is missing']
    },
    price:{
        type:Number,
        required:[true, 'please product price is missing']
    },
    featured:{
        type:Boolean,
        default: false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','ceressa','marcos'],
            message: '{VALUE} is not supported'
        }
        // ['ikea','liddy','ceressa','marcos']
    }
})

module.exports = mongoose.model('Product', productSchema)