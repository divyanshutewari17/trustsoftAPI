const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    }, 
    password:{
        type: String,
        required:true
    }
})



mongoose.model("user",userSchema)
