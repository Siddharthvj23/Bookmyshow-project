const router = require('express').Router()
const authmiddleware = require('../middleware/authMiddleware')
const Theatre = require('../models/TheatreModal')
const User = require('../models/userModel')

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

//theatres of specific owner
router.post('/get-all-theatres-by-owner',async(req,res)=>{
    try {
        const allTheatres = await Theatre.find({owner: req.body.owner})
        res.send({
            success: true,
            message: "All theatres fetched successfully",
            data: allTheatres
        })
    } catch (error) {
        res.send({
            success: true,
            message: error.message
        })
    }
})

router.put('/update-theatre',authmiddleware,async(req,res)=>{
    try {
       
        const ans =  await Theatre.findById(req.body.theatreId)
        const ans2 = await User.findById(req.body.userId)
        
        const theatreOwner = ans.owner.toString()
        const admin = ans2._id.toString()
    

        if(theatreOwner===req.body.userId || admin === req.body.userId){
           await Theatre.findByIdAndUpdate(req.body.theatreId,req.body)
           
        res.send({
            success: true,
            message: 'Theatre has been Updated'
        }) 
        }else{
            res.send({
                success: false,
                message: "you cannot update this theatre as you're not the owner"
            })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })        
    }
})

router.delete('/deleteTheatre',async(req,res)=>{
    try {
        const theatre = await Theatre.findByIdAndDelete(req.body.theatreId)
        res.send({
            success: true,
            message: 'The theatre has been Deleted'
        })
    } catch (error) {
        res.send({
            success: false,
            message:error.message
        })
        
    }
})

module.exports = router