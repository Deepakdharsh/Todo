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

    try {
        const newTodo=await Todo.create({
            todo,
            dueDate,
            userId
        })
    
        res.json({
            message:"created todo",
            userId
        })        
    } catch (error) {
       console.log(error.message) 
    }
    
})

TodoRouter.put("/update",auth,async(req,res)=>{
    const userId=req.userId
    const {
        todo,
        // dueDate,
        id:todoId}=req.body

    if(!todo){
        res.json({
            message:"All fields are required"
        })
    }

    try {
        
    const updateTodo=await Todo.updateOne({_id:todoId,userId},{
        todo,
        // dueDate
    },{new:true})
    
    if(!updateTodo){
        return res.json({
            message:"something went wrong"
        })
    }

    res.json({
        message:"updated Todo"
    })

    } catch (error) {
        console.log(error.message)
    }

})

TodoRouter.get("/read",auth,async(req,res)=>{
    const userId=req.userId
    
    try {
        const todos=await Todo.find({userId})

        res.json({
            message:"successfully feteched Todo",
            todos
        })
    } catch (error) {
        console.log(error.message)
    }
  
})

TodoRouter.delete("/delete/:id",auth,async(req,res)=>{
    const userId=req.userId
    // const {todoId}=req.body
    // console.log(req.body)
    const todoId=req.params.id
    
    if(!todoId){
       return res.json({
            message:"all fields are required"
        })
    }

    try {
    const todo=await Todo.deleteOne({userId,_id:todoId})

    if(!todo){
        res.json({message:"something went wrong"})
    }

    res.json({
        messaage:"todo deleted",
        todo
    })
    } catch (error) {
       console.log(error.message) 
    }
})

module.exports=TodoRouter