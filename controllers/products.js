const Product = require('../models/product')

const getAllProductsStatic =async(req, res)=>{
    const {featured, company, name, sort} = req.query;
    const objectQuery = {};
    if(featured){
        objectQuery.featured = featured === 'true' ? true : false;
    }
    if(company){
        objectQuery.company = company
    }
    if(name){
        objectQuery.name = {$regex: name, $options: 'i'}
    }
    let result = Product.find(objectQuery)
    if(sort){
        let sorting = sort.split(',').join(' ')
        result = result.sort(sorting)
    }
    const product = await result;
   return res.status(200).json({product, nbHits: product.length}); 
}

const getAllProducts =(req, res)=>{
   return res.status(200).json({msg: 'products route'})
}

module.exports ={
    getAllProductsStatic,
    getAllProducts
}