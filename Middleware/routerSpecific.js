// import jsonwebtoken
const jwt = require('jsonwebtoken')

// define logic for checking user loginned or not

// define logic for checking user loginned or not
const logMiddleware = (req,res,next)=>{
    console.log("Router specific middleware");
// get token
const token = req.headers['access-token']
try{
// varify token
const {loginUsername} = jwt.verify(token,"supersecretkey12345")
console.log(loginUsername);

req.loginUsername = loginUsername

    next()
}
catch{
    res.status(401).json("Please log in")
}
}

module.exports = {
    logMiddleware
}


