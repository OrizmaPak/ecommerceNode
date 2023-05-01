const Product = require('../models/product')

const getAllProductsStatic =async(req, res)=>{
    const {featured, company, name, sort, select, numericFilters} = req.query;
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
    if(numericFilters){
        const operationsMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        } 
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match)=>`-${operationsMap[match]}-`); 
        // const options = ['price', 'rating'];
        // filters = filters.split(',').forEach(item=>{
        //     const [field, operator, value] = item.split('-')
        //     if(options.includes(field)){
        //        objectQuery[field] = {[operator]: Number(value)} 
        //     }
        // })
        filters = filters.split(',');
        for(i=0;i<filters.length;i++){
            console.log(filters[i])
            if(filters[i].split('-')[0] == 'price'){ 
                objectQuery[filters[i].split('-')[0]] = { [filters[i].split('-')[1]]: Number(filters[i].split('-')[2])}
            }
            if(filters[i].split('-')[0] == 'rating'){ 
                objectQuery[filters[i].split('-')[0]] = { [filters[i].split('-')[1]]: Number(filters[i].split('-')[2])}
            }
        }
        console.log('filters', filters);
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