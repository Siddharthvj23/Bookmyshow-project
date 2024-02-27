const express = require('express')
require('dotenv').config();

const dbConfig = require('./dbCongfig')

const PORT = 8081

const app = express()

const userRoutes = require('./routes/userRoutes')
app.use(express.json())
app.use('/api/users',userRoutes)



app.listen(PORT,()=>{
    console.log("server Running")
})

