const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    sex:{
        type:String,
        enum: ['Male', 'Female'],
        required:true
    },
    department:{
        type:String,
        required:true,
    },
    level:{
        type:String,
        enum:['100l','200l','300l','400l','500l','600l','700l'],
        required:true
    },
    description:{
        type:String,
    },
    attributeOne:{
        type:String,
    },
    attributeTwo:{
        type:String,
    },
    attributeThree:{
        type:String,
    },
    attributeFour:{
        type:String,
    },
    attributeFive:{
        type:String,
    },
    attributeSix:{
        type:String,
    },
    pictureOne:{
        type:String,
    },
    pictureTwo:{
        type:String
    },
    pictureThree:{
        type:String
    },
    pictureFour:{
        type:String
    },
    pictureFive:{
        type:String
    },
    pictureSix:{
        type:String
    }
})



const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;