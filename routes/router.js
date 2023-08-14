// import express
const express = require('express')

// import middleware
const middleware = require('../Middleware/routerSpecific')

// to create route using express
const router = new express.Router()

// import userController
const userController = require('../controllers/userController')
// import product controller
const productController = require('../controllers/productController')
// import wishlist controller
// const wishlistController = require('../controllers/wishlistController')


// register
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)

// allproducts
router.get('/products/get-all-products',productController.getallproducts)

// viewproducts
router.get('/products/viewproducts/:id',productController.viewProduct)

// route for add to wishlist
router.post('/wishlist/add-item', middleware.logMiddleware,userController.addtowishlist)

// route for getwishlist

router.get('/wishlist/get-item', middleware.logMiddleware,userController.getwishlist)

// remove item from wishlist
router.post('/cart/deletelist-item/:id',middleware.logMiddleware,userController.deletewlistitem)


// add product to cart
router.post('/cart/add-products',middleware.logMiddleware,userController.addtocart)

// get cart
router.get('/cart/getcartproducts',middleware.logMiddleware,userController.getcart)


// delete an item from cart
router.post('/cart/deletecart-item/:id',middleware.logMiddleware,userController.deletecartitem)

// delete all cart items

router.post('/cart/removecart-items',middleware.logMiddleware,userController.deletecitems)


// inc
// router.post('/cart/deletecart-item',middleware.logMiddleware,userController.deletecartitem)

// delete ac
router.post('/user/remove',middleware.logMiddleware,userController.deleteacnt)

// exportrouter
module.exports= router