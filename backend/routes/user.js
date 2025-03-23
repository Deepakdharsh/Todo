//  start writing your code from here
const express=require("express")
const UserRouter=express.Router()
const {User}=require("../db/index")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

UserRouter.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body

    if(!username||!email||!password){
        return res.json({
            messsage:"invaild credentails"
        })
    }

    const user=await User.findOne({email})

    if(user){
        return res.json({
            message:"user already exists"
        })
    }

    const hashedPass=await bcrypt.hash(password,10)
    await User.create({
        username,
        email,
        password:hashedPass
    })

    res.json({
        message:"user created"
    })
    
})

UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    if(!email||!password){
        return res.json({
            message:"invaild credentails"
        })
    }

    const user=await User.findOne({email})

    if(!user){
        return res.json({
            message:"No user found"
        })
    }

    const isCorrect=await bcrypt.compare(password,user.password)

    if(!isCorrect){
        res.json({
            message:"invaild credentails"
        })
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.json({
        message:"your logged In",
        token
    })
})

module.exports=UserRouter