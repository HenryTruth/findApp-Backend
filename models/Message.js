const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    receiverId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    message:{
        type:String
    },
    isRead:{
        type:Boolean
    }
})

const Message = mongoose.model('message', messageSchema)

module.exports = Message