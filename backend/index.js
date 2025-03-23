require("domain").config()
const express=require("express")
const app=express
const mongoose=require("mongoose")

app.use(express.json())
app.use(cors())


const PORT=process.env.PORT || 4000
async function main(){
    await mongoose.connect(process.env.MONGO_DB_URI)
    app.listen(process.env.PORT,()=>console.log(`server has startd on port:${PORT}`))
}