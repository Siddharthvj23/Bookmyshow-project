const router = require('express').Router()

const Show = require('../models/ShowModal')


router.post('/add-show',async(req,res)=>{
    try {
        const newShow = new Show(req.body)
        await newShow.save()
        res.send({
            success: true,
            message: 'New show has been Added'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.post('/get-all-shows-by-theatre',async(req,res)=>{
    try {
        const shows = await Show.find({theatre: req.body.theatreId}).populate('movie')
        res.send({
            success: true,
            message: "All shows fetched",
            data: shows
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.delete('/delete-show',async(req,res)=>{
    try {
        await Show.findByIdAndDelete(req.body.showId)
        res.send({
            success: true,
            message: 'The show has been deleted!'
        })
    } catch (error) {
        res.send({
            status: false,
            message: error.message
        })
    }
})

router.put('/update-show',async(req,res)=>{
    try {
        await Show.findByIdAndUpdate(req.body.showId, req.body);
        res.send({
            success: true,
            message: 'The show has been updated!'
        });
    } catch (error) {
        res.send({
            success: false,
            message: err.message
        })

    }
})

module.exports = router