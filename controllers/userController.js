// import collection/model

const products = require('../models/userSchema')

// define jsonwebtoken
const jwt = require('jsonwebtoken')

// register

exports.register = async (req,res)=>{

    // register logic
    console.log(req.body);
  
    // get data send by front end
    const {username,phone,password} = req.body
    if(!username || !phone || !password){
      res.status(403).json("All Inputs are required!!!")
    }
    
    // check user is an exist user or not
  try{
     const preuser = await products.findOne ({phone})
     if(preuser){
      res.status(406).json("User already exist!!!")
     }
     else{
      // add user to database
      const newuser = new products({
        username,
        password,
        phone,
        wishlist:[],
        cart:[]
      })
      // to save newuser in mongodb
      await newuser.save()
      res.status(200).json(newuser)
  
     }
    
  }catch(error){
    res.status(401).json(error)
   }
   } 


    // login 
  exports.login = async (req,res)=>{
    // get req body
    const {username,password}= req.body
    try{
      // check username n pswd is in db
      const preuser = await products.findOne({username,password})
      // check preuser or not
      if(preuser){
        // generate token using jwt
        const token = jwt.sign({
          loginUsername:username
        },"supersecretkey12345")
        // send to client
        res.status(200).json({preuser,token})
      }
      else{
        res.status(404).json("Invalid Username / Password")
      }
    }
    catch(error){
      res.status(401).json(error)
    }
  }

  // logic to add product to wishlist

  exports.addtowishlist = async (req, res) => {

    const { loginUsername } = req
    // console.log(loginEmail);
    // get dish details from req
    const {  id, brand,name, image_link, cost, description} = req.body
    // console.log(id,title,image,price,quantity);
    const preuser = await products.findOne({ username: loginUsername})
    // console.log(preuser);
    try {
  
      preuser.wishlist.push({
        id:id,
        brand:brand,
        name:name,
        image_link:image_link,
        cost:cost,
        description:description
      })
      await preuser.save()
      res.status(200).json("product added to wishlists")
    }
    catch (error) {
      res.status(401).json(error)
       console.log(error);
    }
  
  
  
  }

// getwishlist
exports.getwishlist = async (req, res) => {
  const {loginUsername} = req
  try {
    const preuser = await products.findOne({ username: loginUsername})
    console.log(preuser);
    res.status(200).json(preuser.wishlist)

  }
  catch (error) {
    res.status(401).json(error)
    console.log(error);
  }
}



  // logic to add product to cart
  exports.addtocart = async (req,res)=>{
    const {loginUsername} = req
    console.log(loginUsername);
    // get product details from req to add
    const{id,brand,name,image_link,cost,description}=req.body
    // console.log(id,brand,name,image_link,cost,description)
    const preuser= await products.findOne({username:loginUsername})
    console.log(preuser);
    try{
  
  
  preuser.cart.push({
    p_id:id,p_brand:brand,p_name:name,p_img:image_link,p_cost:cost,p_descr:description
  })
  await preuser.save()
  res.status(200).json("Product added to cart")
       
    }
    catch(error){
        res.status(401).json(error)
        console.log(error);
    }
  }

  // get cart
  exports.getcart = async (req,res)=>{
    let {loginUsername} = req
    try{
      const preuser = await products.findOne({username:loginUsername})
  res.status(200).json(preuser.cart)
  }
  catch(error){
  res.status(401).json(error)
  }
  
    }

    //delete an item from wishlist
    
    exports.deletewlistitem = async (req,res)=>{
      const {id} = req.body
      const { loginUsername } = req
       console.log(id,loginUsername);
      try{
        const preuser= await products.updateOne({ username:loginUsername },{$pull:{wishlist:{id:id}}});
        
         res.status(200).json(`Successfully removed a product`);
         
      }
      catch(error){
          res.status(401).json(error)
          console.log(error);
      }
    }

    // Delete one cart-item

exports.deletecartitem = async (req,res)=>{
  const {id} = req.body
  const { loginUsername } = req
   console.log(id,loginUsername);
  try{
    const preuser= await products.updateOne({ username:loginUsername },{$pull:{cart:{p_id:id}}});
    
     res.status(200).json(`deleted a product`);
     
  }
  catch(error){
      res.status(401).json(error)
      console.log(error);
  }
}

    // Delete all cart-items

    exports.deletecitems = async (req,res)=>{
      const {id} = req.body
      const { loginUsername } = req
       console.log(id,loginUsername);
      try{
        const preuser= await products.updateMany({ username:loginUsername },{$pull:{cart:{p_id:id}}});
        
         res.status(200).json(`Shope More..Happy shopping`);
         
      }
      catch(error){
          res.status(401).json(error)
          console.log(error);
      }
    }

// logic to increment

exports.incCart = async (req,res)=>{
  // get id from req

  const {id} =req.params
  try{
    // check id is in carts model
    const item = await products.findOne({ username:loginUsername },{$push:{cart:{p_id:id}}});
    res.status(200).json(` incremented`);

  }
  catch(error){
    res.status(401).json(error)
    console.log(error);
}
}

// delete acc

exports.deleteacnt = async (req,res)=>{
  const {id} = req.body
  const { loginUsername } = req
   console.log(id,loginUsername);
  try{
    const preuser= await products.updateOne({ username:loginUsername },{$pull:{
      products:{username}}});
    
     res.status(200).json(` Account Removed Successfully`);
     
  }
  catch(error){
      res.status(401).json(error)
      console.log(error);
  }

}



