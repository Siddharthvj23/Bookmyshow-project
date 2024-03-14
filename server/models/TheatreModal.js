const mongoose = require('mongoose')

const TheatreSchme =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isActive:{
        type: Boolean,
        required:false
    }

},{timestamps: true}
)

const Theatre = mongoose.model("theatres",TheatreSchme)

module.exports = Theatre