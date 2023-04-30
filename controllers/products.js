const Product = require('/models/product')

const getAllProductsStatic =async(req, res)=>{
    await Product.find({})
   return res.status(200).json(Product);
}

const getAllProducts =(req, res)=>{
   return res.status(200).json({msg: 'products route'})
}

module.exports ={
    getAllProductsStatic,
    getAllProducts
}