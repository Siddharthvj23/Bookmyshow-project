const router = require('express').Router()
const stripe = require('stripe')(process.env.stripe_key)
const authmiddleware = require('../middleware/authMiddleware')
const booking = require('../models/bookingModel') 
const Show = require('../models/ShowModal')

router.post('/make-payment',async(req,res)=>{
    try {
        const {token,amount} = req.body
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id
        })

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            payment_method_types : ["card"],
            receipt_email : token.email,
            description : "Token has been assigned to thhe movie"
        })
        const transactionId = paymentIntent.id

        res.send({
            success: true,
            message : 'Payment Successfull Ticket(s) booked',
            data : transactionId
        })
    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

router.post('/book-show',async(req,res)=>{
    try {
        const newBooking = new booking(req.body)
        await newBooking.save()

        const show = await Show.findById(req.body.show).populate("movie")
        console.log(req.body.seats)
        const updatedBookedSeats = [...show.bookedSeats,...req.body.seats]
        await Show.findByIdAndUpdate(req.body.show,{bookedSeats: updatedBookedSeats})
        res.send({
            success: true,
            message: 'New Booking done!',
            data: newBooking
        });
        console.log(newBooking)
        console.log(show)
        console.log(updatedBookedSeats)
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})

router.get('/get-all-bookings',authmiddleware,async (req ,res) =>{
    try {
        const bookings = await booking.find({ user: req.body.userId}).populate("user").populate("show")
        .populate({
            path : 'show',
            populate: {
                path : 'movie',
                model : 'movies'
            }
        })
        .populate({
            path : 'show',
            populate : {
                path : 'theatre',
                model : 'theatres'
            }
        })
        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router