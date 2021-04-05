const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('user')


module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).send({
            "error":"you must login"
        })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jwtKey,async(err,payload)=>{
        if(err){
            res.status(401).send({
                "error":"you must login"
            })
        }
        const {userId} = payload
        const user = await User.findById(userId)
        req.user=user;
        next()
    })
}