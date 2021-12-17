const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    username:{
        type:String,
        required:true
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
    attributeSeven:{
        type:String
    },
    attributeEight:{
        type:String
    },
    profilePic:{
        type:Object
    },
    availability:{
        type:Boolean
    }, 
    
},{timestamps: true })

profileSchema.index({sex: 'text', department: 'text', level:'text', institution:'text'});



const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
