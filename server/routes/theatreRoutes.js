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

module.exports = router