const cosmetics =require('../models/productSchema')

// logic to getallproducts
exports.getallproducts = async (req,res)=>{
    try{
     const allproducts = await cosmetics.find()
     res.status(200).json(allproducts)
    }
    catch(error){
    res.status(401).json(error)
    }
}

// logic to viewproduct
exports.viewProduct = async (req,res)=>{
    let {id} = req.params

    try{
        const product = await cosmetics.findOne({id})
        res.status(200).json(product)
    }
    catch(error){
        res.status(401).json("Product not found")
    }
}


