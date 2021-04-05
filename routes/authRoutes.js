const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const User=mongoose.model('user');
const Admin= mongoose.model('admin')
//Initial page
router.get("/",(req,res)=>{
    res.send('hello');
})

//admin login
router.post("/admin",(req,res)=>{
    res.send("Welcome admin")
})

//signup
router.post("/signup", async(req,res)=>{
    const {email,password} = req.body;
    const user = new User({
        email,
        password
    })
    await user.save()
})

//user login
router.post("/login",(req,res)=>{

})

module.exports() = router