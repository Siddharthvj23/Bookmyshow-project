const express = require('express')
require('dotenv').config();

const dbConfig = require('./dbCongfig')

const PORT = 8081

const app = express()

const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
const theatreRoutes = require('./routes/theatreRoutes')
const showRoutes = require('./routes/showRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/movies',movieRoutes)
app.use('/api/theatres',theatreRoutes)
app.use('/api/shows',showRoutes)
app.use('/api/bookings',bookingRoutes)

app.listen(PORT,()=>{
    console.log("server Running")
})

