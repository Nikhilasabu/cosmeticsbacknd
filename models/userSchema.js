const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    
    },
    password:{
        type:String,
        required:true 
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },

    wishlist:{
type:Array,
required:true
    },

  cart:{
type:Array,
required:true
    }
    
})

// create a model or collection to store documents as given schema
const products = mongoose.model("products",userSchema)

// export model
module.exports = products