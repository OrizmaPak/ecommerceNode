const Product = require('../models/product')

const getAllProductsStatic =async(req, res)=>{
    const product = await Product.find({})
   return res.status(200).json({product});
}

const getAllProducts =(req, res)=>{
   return res.status(200).json({msg: 'products route'})
}

module.exports ={
    getAllProductsStatic,
    getAllProducts
}