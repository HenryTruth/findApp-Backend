const mongoose = require('mongoose');


const pictureSchema = new mongoose.Schema({
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    cloudinary_id:{
        type:String
    },
})



const Picture = mongoose.model('picture', pictureSchema);

module.exports = Picture;
