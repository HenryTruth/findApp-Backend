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
    institution:{
        type:String,
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
    profilePic:{
        type:Object
    },
})



const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
