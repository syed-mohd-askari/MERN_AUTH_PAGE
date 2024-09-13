const bcrypt = require ('bcrypt');
const userModel = require('../Models/user');
const jwt = require('jsonwebtoken');

const signup = async (req,res)=>{
    try{
        const {name , email , password} =req.body;

        // checking if user already exists
        const user = await userModel.findOne({email});
        if(user){
            return res.status(409).json({message : "User already exists , you can login" , success : false});
        }

        // create a new user model if user doesnt exist
        const newModel = new userModel({name , email , password});

        //encrypting password before saving in DB and 10 represents value of salting
        newModel.password = await bcrypt.hash(password,10);
       
        //saving in Database
        await newModel.save();
        res.status(201).json({message: "Signup Successful !" , success:true})
    }
    catch(err){
        console.error("Error during signup:", err);
        res.status(500).json({message: "Internal Server Error !" , success:false , err})
    }
}

const login = async (req,res)=>{
    try{
        const {email , password} =req.body;
        const errorMsg = "Auth failed email or password is wrong !";

        // checking if user doesnt exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(403).json({message : errorMsg , success : false});
        }

        //checking password , first parameter takes client entered pass 
        //and next param takes pass from database and then campares it
        const isPassEqual = await bcrypt.compare(password,user.password)
        if(!isPassEqual){
            return res.status(403).json({message : errorMsg , success : false});
        }

        //implementing jwt token
        const jwtoken = jwt.sign(
            {email : user.email , _id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )

        res.status(200).json({message: "Login Successful !" , success:true,jwtoken,email,name:user.name})
    }
    catch(err){
        console.error("Error during login:", err);
        res.status(500).json({message: "Internal Server Error !" , success:false , err})
    }
}



module.exports = {
    login,
    signup
}