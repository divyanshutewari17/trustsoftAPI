const express = require('express')
const app = express()
let PORT =process.env.PORT||3000
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser=require('body-parser')
const {mongoURL,jwtKey}=require('./keys')

require("./model/userSchema")
require("./model/adminSchema")

const requireToken= require('./middleware/requireToken')

app.use(bodyParser.json());

const User=mongoose.model('user');
const Admin= mongoose.model('admin')

mongoose.connect(mongoURL,{
    useNewUrlParser:true
})

//Initial page
app.get("/",requireToken,(req,res)=>{
    res.send('Your email is'+req.user.email);
})

//new admin
app.post("/new-admin",async(req,res)=>{
    const {adminName,adminPassword} = req.body;
    const hashedPwd = await bcrypt.hash(adminPassword, 10);
    const admin = new Admin({
        adminName:adminName,
        adminPassword: hashedPwd
    })
    await admin.save();
    res.send("Admin added")
    const token = jwt.sign({adminId:admin._id},jwtKey)

    
})
//admin login
app.post("/admin",async(req,res)=>{
    try {
        const admin = await Admin.findOne({ adminName: req.body.adminName });
        
        if (admin) {
          const cmp = await bcrypt.compare(req.body.adminPassword, admin.adminPassword);
          if (cmp) {
              
              res.send("Legal Admin")
              
          } else {
            res.send("Wrong admin details");
          }
        } else {
          res.send("Wrong admin details");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }
})

//signup
app.post("/signup", async(req,res)=>{
    const {email,password} = req.body;
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = new User({
        email:email,
        password: hashedPwd
    })
    await user.save();
    const token = jwt.sign({userId:user._id},jwtKey)

    res.send(token)
})

//user login
app.post("/login",async(req,res)=>{
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {
            
            res.send("Authenticated")
            
        } else {
          res.send("Wrong username or password.");
        }
      } else {
        res.send("Wrong username or password.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });

app.listen(PORT,()=>{

})
