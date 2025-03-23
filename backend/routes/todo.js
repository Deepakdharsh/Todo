//  start writing your code from here
const express=require("express")
const TodoRouter=express.Router()

TodoRouter.post("/create",(req,res)=>{})
TodoRouter.put("/update/:id",(req,res)=>{})
TodoRouter.get("/read",(req,res)=>{})
TodoRouter.delete("/delete/:id",(req,res)=>{})

module.exports=UserRouter