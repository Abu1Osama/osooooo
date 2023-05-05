const express=require("express")
const { connection } = require("./Config/db")
require("dotenv").config()
const {userRouter} =require("./Routes/user.route")
const app=express()

// app.get((req,res)=>{
//   res.send("welcome to my website")
// })


app.use(express.json())
app.use(userRouter)


app.listen(process.env.port,async()=>{
try {
  await connection
  console.log("db is connected")
  
} catch (error) {
  console.log("db is not connected")
}
console.log(`http://localhost:${process.env.port}`)
})