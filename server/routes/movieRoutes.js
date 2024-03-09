const router = require('express').Router()
const Movie = require('../models/MovieModel')

router.post('/add-movie',async(req,res)=>{
    try {
        const newMovie = new Movie(req.body)
        await newMovie.save()
        res.send({
            success: true,
            message: 'New movie has been added'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
        
    }
})

//get all movie
router.get('/get-movie',async(req,res)=>{
    try {
       const allmovies = await Movie.find() 
       res.send({
        success:true,
        message:"All movies have been fetched",
        data: allmovies
       })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
        
    }

})
//update movie 
router.put('/update-movie/:id',async(req,res)=>{
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id)
        res.send({
            success: true,
            message: 'The Movie has been updated',
            data: movie

        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
        
    }
})
module.exports = router 