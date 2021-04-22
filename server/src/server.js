const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./Routes/user.route')
const financeRoutes = require('./Routes/finance.route')
const verifyJWT = require('./Routes/verifyJWT')
const app = express()
const PORT = process.env.PORT || 8080
//const URI = "mongodb+srv://yarik:1290@cluster0.n9r79.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(process.env.URI,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('MongoDB connection established successfully')
})
app.use(express.static(path.join(__dirname,'public')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
app.use(cors())
app.use(express.json())
app.use('/user', userRoutes)
app.use('/user/finance', verifyJWT)
app.use('/user/finance', financeRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}...`)
})