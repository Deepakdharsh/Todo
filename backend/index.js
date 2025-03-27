require("dotenv").config()
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const UserRouter=require("./routes/user")
const TodoRouter=require("./routes/todo")
const cookieParser=require("cookie-parser")

app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))
app.use(cookieParser())

app.use("/user",UserRouter)
app.use("/todo",TodoRouter) 


const PORT=process.env.PORT || 4000

async function main(){
    await mongoose.connect(process.env.MONGO_DB_URI)
    app.listen(process.env.PORT,()=>console.log(`server has startd on port:${PORT}`))
}
main()