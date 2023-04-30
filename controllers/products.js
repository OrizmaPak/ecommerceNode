

const getAllProductsStatic =(req, res)=>{
    throw new Error('this is the mother fucking error');
   return res.status(200).json({msg: 'products testing route'})
}

const getAllProducts =(req, res)=>{
   return res.status(200).json({msg: 'products route'})
}

module.exports ={
    getAllProductsStatic,
    getAllProducts
}