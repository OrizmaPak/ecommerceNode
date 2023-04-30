const Product = require('../models/product')

const getAllProductsStatic =async(req, res)=>{
    const {featured} = req.query;
    const objectQuery = {};
    if(featured){
        objectQuery.featured = featured === 'true' ? true : false;
    }
    const product = await Product.find(req.query)
   return res.status(200).json({product, nbHits: product.length});
}

const getAllProducts =(req, res)=>{
   return res.status(200).json({msg: 'products route'})
}

module.exports ={
    getAllProductsStatic,
    getAllProducts
}