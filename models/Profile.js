const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    username:{
        type:String,
        
    }
})


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Please enter a username'],
        unique:true,
        lowercase:true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }
});


const User = mongoose.model('user', userSchema);

module.exports = User;