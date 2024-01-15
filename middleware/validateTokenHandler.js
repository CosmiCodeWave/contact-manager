const asyncHandler = require("express");
const jwt = require("jsonwebtoken");
const { route } = require("../routes/contactRoutes");

const validateToken = asyncHandler(async(req,res,next)=>{
let token ;
let authHeader = req.headers.Authorization || req.headers.authorization;
if(authHeader && authHeader.startsWith("bearer")){
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err,decoded) =>{
        if(err){
            res.status(401);
            throw new Error("User is not authorized");
        }
        console.log(decoded);
    })
}
});

module.exports = validateToken;