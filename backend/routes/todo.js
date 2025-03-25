//  start writing your code from here
const express=require("express")
const TodoRouter=express.Router()
const {Todo}=require("../db/index")
const auth=require("../middleware/user")

TodoRouter.post("/create",auth,async(req,res)=>{
    const {todo,dueDate}=req.body
    const userId=req.userId

    if(!todo||!dueDate){
        res.json({
            message:"All fields are required"
        })
    }

    const newTodo=await Todo.create({
        todo,
        dueDate,
        userId
    })

    res.json({
        message:"created todo",
        userId
    })
    
})

TodoRouter.put("/update",auth,async(req,res)=>{
    const userId=req.userId
    const {todo,dueDate,todoId}=req.body

    if(!todo||!dueDate){
        res.json({
            message:"All fields are required"
        })
    }

    const updateTodo=await Todo.updateOne({_id:todoId,userId},{todo,dueDate},{new:true})
    
    if(!updateTodo){
        return res.json({
            message:"something went wrong"
        })
    }

    res.json({
        message:"updated Todo"
    })
})

TodoRouter.get("/read",auth,async(req,res)=>{
    const userId=req.userId
    
    const todos=await Todo.find({userId})

    res.json({
        message:"successfully feteched Todo",
        todos
    })
})

TodoRouter.delete("/delete",auth,async(req,res)=>{
    const userId=req.userId
    const {todoId}=req.body

    if(!todoId){
        res.json({
            message:"all fields are required"
        })
    }

    const todo=await Todo.deleteOne({userId,_id:todoId})

    if(!todo){
        res.json({message:"something went wrong"})
    }

    res.json({
        messaage:"todo deleted",
        todo
    })
})

module.exports=TodoRouter