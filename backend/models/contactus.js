const mongoose = require ('mongoose')

    const schema = new mongoose.Schema({
        name:{
            type:String,
            requred:true
        },
        email:{
            type:String,
            requred:true
        }, 
        mobile:{
            type:Number,
            requred:true
        },
        message:{
            type:String,
            required:true
        }
    })

    const contactDB = mongoose.model('contactUs',schema)
    module.exports = contactDB
