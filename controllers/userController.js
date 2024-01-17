const asyncHandler = require ("express-async-handler");
const User = require ("../models/userModel");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

//@desc register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler (async (req, res, next) => {
    
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }
    
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password ",hashedPassword);
    const user =await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201);
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message:"Register the user"});
    });
 
//@desc login a user
//@route POST /api/users/login
//@access public

    const loginUser = asyncHandler( async (req, res, next) => {
        const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({email});
    //compare password with hash password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
            username: user.username,
            email: user.email,
            id: user.id,
         },
        },process.env.ACCESS_TOKEN_SECERT,
        {expiresIn: '15m'}
        );
        res.status(200).json({accessToken});
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
        res.json({message:"Login the user"});
    });    

//@desc current user info
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler( async (req, res, next) => {
    res.json(req.user);
});    

    
module.exports={registerUser,loginUser,currentUser};