const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true    
    },
    description: {
        type: String, 
        required: true    
    },
    duration: {
        type: Number, 
        required: true    
    },
    genre: {
        type: String, 
        required: true    
    },
    language: {
        type: String, 
        required: true    
    },
    releasedate: {
        type: Date, 
        required: true    
    },
    poster: {
        type: String, 
        required: true
    },
})

const Movies = mongoose.model('movies',MovieSchema)

module.exports = Movies