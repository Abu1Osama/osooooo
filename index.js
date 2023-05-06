const express=require("express")
const { connection } = require("./Config/db")
require("dotenv").config()
const cors=require("cors")
const {userRouter} =require("./Routes/user.route")
const app=express()


app.use(express.json())
app.use(cors())



app.use(userRouter)


app.listen(process.env.port,async()=>{
try {
  await connection
  console.log("db is connected")
  
} catch (error) {
  console.log("db is not connecte")
}
console.log(`http://localhost:${process.env.port}`)
})