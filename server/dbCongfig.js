const mongoose = require('mongoose')

mongoose.connect(process.env.Dburl).then(()=>{
    console.log("Connection Succesful")
}).catch(()=>{
    console.log('Connection UnSuccesful')
})