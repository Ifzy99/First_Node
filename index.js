const express =require ('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose')
let URI = process.env.MONGODB_URI
mongoose.connect(URI)
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log(err))
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true, limit: "50mb"}))
app.use(express.json({limit:"50mb"}))

const userRoute = require('./routes/user.route')
app.use("/user", userRoute)



app.listen(PORT, ()=>{
    console.log(`port has started at ${PORT}`);
})