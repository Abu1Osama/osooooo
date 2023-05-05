const express = require("express");
const { userModel } = require("../Models/user.model");
const userRouter = express.Router();
const bcrypt=require("bcrypt")
require("dotenv").config()
userRouter.get("/",async(req,res)=>{
    
    let finddd=await userModel.find()
    res.status(200).send(finddd)
})


userRouter.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let checkemail = await userModel.find({ email });
    if (name == "" || email == "" || password == "") {
      res.status(401).send({ "msg": "provide all field" });
    }
    if (password.length < 5) {
      res.status(411).send({ "msg": "provide strong field" });
    }
    if (checkemail.length > 0) {
      res.status(411).send({ "msg": "email already exist" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(404).send({ "msg": err });
        } else {
          const savedata = userModel({ name, email, password: hash });
          await savedata.save();
          res.status(200).send({ "msg": "Registered successfully" });
        }
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ "msg": error });
  }
});

module.exports={
    userRouter
}
