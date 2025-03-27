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

    try {
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
    
    } catch (error) {
        console.log(error.message)
    }
})

UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    if(!email||!password){
        return res.json({
            message:"invaild credentails"
        })
    }

    try {
        
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

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"15m"})
    const refreshToken=jwt.sign({id:user._id},process.env.REFRESH_SECRET,{expiresIn:"7d"})

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV == "production" ? true : false,
        sameSite:"strict"
    })

    res.json({
        message:"your logged In",
        token
    })

    } catch (error) {
        console.log(error.error)
    }
})

UserRouter.post("/refresh",(req,res)=>{
    console.log("refresh")
    const refreshToken=req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json({message:"No refresh token"})

    jwt.verify(refreshToken,process.env.REFRESH_SECRET,(err,user)=>{
        if(err) return res.status(403).json({
            message:"Invaild refresh token"
        })

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"15m"})
        res.json({token})
    })    
})

module.exports=UserRouter