const express = require('express')
require('dotenv').config();

const dbConfig = require('./dbCongfig')

const PORT = 8081

const app = express()

const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/movies',movieRoutes)


app.listen(PORT,()=>{
    console.log("server Running")
})

