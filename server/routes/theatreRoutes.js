const router = require('express').Router()
const Theatre = require('../models/TheatreModal')

router.post('/add-theatre', async(req,res)=>{
    try {
        const newTheatre = new Theatre(req.body)
        await newTheatre.save()
        res.send({
            success: true,
            message: 'New theatre has been added'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get('/get-all-theatres',async(req,res)=>{
    try {
        const allTheatres = await Theatre.find().populate('owner')
        res.send({
            success: true,
            message: 'All theatres fetched Successfully',
            data: allTheatres
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.put('/update-theatre', async(req,res)=>{
    try {
        await Theatre.findByIdAndUpdate(req.body.theatreId,req.body)
        res.send({
            success: true,
            message: 'Theatre has been Updated'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })        
    }
})

module.exports = router