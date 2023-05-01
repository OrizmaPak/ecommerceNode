const Product = require('../models/product')

const getAllProductsStatic =async(req, res)=>{
    const {featured, company, name, sort, select} = req.query;
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
    if(select){
        let selecting = select.split(',').join(' ')
        result = result.select(selecting)
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1)*limit;  
    const product = await result.skip(skip).limit(limit);
   return res.status(200).json({product, nbHits: product.length}); 
}

const getAllProducts =(req, res)=>{
   return res.status(200).json({msg: 'products route'})
}

module.exports ={
    getAllProductsStatic,
    getAllProducts
}