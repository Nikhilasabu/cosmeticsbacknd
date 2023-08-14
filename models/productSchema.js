const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    
        id: {
         type:Number,
         required:true,
         unique:true
        },
        brand: {
            type:String,
            required:true
        },
        name: {
            type:String,
            required:true
        },
        image_link: {
            type:String,
            required:true
        },
        cost: {
            type:Number,
            required:true,
            unique:true
        },
        description: {
            type:String,
            required:true
        }        
});

const cosmetics = mongoose.model("cosmetics",productSchema)

module.exports = cosmetics

