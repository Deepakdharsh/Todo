//  start writing from here
const mongoose=require("mongoose")
const { boolean } = require("zod")
const Schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId

const UserSchema=new Schema({
    username:String,
    email:String,
    password:String
})

const TodoSchema=new Schema({
    todo:String,
    dueDate:String,
    userId:ObjectId,
    isDone:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model("user",UserSchema)
const Todo=mongoose.model("todo",TodoSchema)

module.exports = {
    User,
    Todo
};
