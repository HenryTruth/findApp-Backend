const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    createdAt:{
        type:Date,
    },
    user:{
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    },
    image:{
        type:String
    },
    sent:{
        type:Boolean
    },
    received:{
        type:Boolean
    },
    pending:{
        type:Boolean
    }
})

const Message = mongoose.model('message', messageSchema)

module.exports = Message