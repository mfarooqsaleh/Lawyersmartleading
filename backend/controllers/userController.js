import User from "../models/userModel.js";
import asynHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js"
const registerUser=asynHandler(async(req,res)=>{

const {name,email,password,pic}=req.body;

const userExists=await User.findOne({email});
if(userExists){
    res.status(400)
    throw new Error("User Already Exists")
    }
    const user=await User.create({
        name,
        email,
        password,
        pic
    });
if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        pic:user.pic,
        token:generateToken(user._id)

    });
}
else{
    res.status(400)
    throw Error("Error Occured");
}

});

const authUser=asynHandler(async(req,res)=>{

    const { email, password } = req.body;
      
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token:generateToken(user._id)
      });
    }
    else{
        res.status(400)
        throw Error("Wrong Password");
    }
    
    });
    

    
      


export{ registerUser,authUser };