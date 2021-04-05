const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    adminName:{
        type:String,
        unique:true,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
})

mongoose.model("admin",adminSchema)