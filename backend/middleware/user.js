const jwt=require("jsonwebtoken")

function auth(req,res,next){
    const token=req.headers.token
    if(token){
        const deocoded=jwt.verify(token,process.env.JWT_SECRET)
        if(deocoded){
            req.userId=deocoded.id
            next()
        }
    }else{
        res.json({
            message:"invaild tokens"
        })
    }
}

module.exports=auth