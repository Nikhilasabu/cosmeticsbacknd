// loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/connection')
const router = require('./routes/router')
// import middleware
const middleware = require('./Middleware/appMiddleware')

// create express server
const server = express()

// use packages to server
server.use(cors())
server.use(express.json())

// use middleware
server.use(middleware.appMiddleware)
server.use(router)
// create port where server should listen
const PORT = process.env.PORT || 3000



// resolve get request to localhost:3000
server.get('/',(req,res)=>{
    res.status(200).json("E cart server started")
})

server.post('/',(req,res)=>{
    res.send("post method")
})

//delete request
server.delete('/',(req,res)=>{
    res.send("Delete method")
})



// run server
server.listen(PORT,()=>{
    console.log(`costume-ecart cart server started at ${PORT}`);
})