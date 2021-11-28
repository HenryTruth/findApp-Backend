const User = require("../models/User");
const Profile = require("../models/Profile")
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary')
const fs = require('fs')
const dotenv = require('dotenv');

dotenv.config()


const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors

    if(err.message){
      if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
          // console.log(val);
          // console.log(properties);
          errors[properties.path] = properties.message;
        });
      }
    }
  
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge
  });
};


module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const user = await User.create({ username, email, password });
      const token = createToken(user._id);
      res.status(201).json({ id: user._id, username: user.username, token:token  });
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({errors});
    }
   
  }


  module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.status(200).json({ id: user._id, email: user.email, token:token  });
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }
  
  
  module.exports.profile_post = async (req, res) => {
    const {
      user, 
      sex, 
      department, 
      level,
      institution,
      description, 
      attributeOne,
      attributeTwo, 
      attributeThree, 
      attributeFour, 
      attributeFive, 
      attributeSix
    } = req.body;

  
    try {
        const uploader = async (path) => await cloudinary.uploads(path, 'Images')
        const files = req.files;
        const urls = []
        for (const i in files){
            const { path } = files[i][0]
            const newpath = await uploader(path)
            urls.push(newpath)
            fs.unlinkSync(path)
        }

        const profile = await Profile.create({ 
            user,
            sex,
            department,
            level,
            institution,
            description,
            attributeOne,
            attributeTwo,
            attributeThree,
            attributeFour,
            attributeFive,
            attributeSix,
            profilePic:{
              avatar:urls[0].url,
              cloudinary_id:urls[0].id
            },
            pictureOne:{
              avatar:urls[1].url,
              cloudinary_id:urls[1].id
            },
            pictureTwo:{
              avatar:urls[2].url,
              cloudinary_id:urls[2].id
            },
            pictureThree:{
              avatar:urls[3].url,
              cloudinary_id:urls[3].id
            },
            pictureFour:{
              avatar:urls[4].url,
              cloudinary_id:urls[4].id
            },
            pictureFive:{
              avatar:urls[5].url,
              cloudinary_id:urls[5].id
            },
            pictureSix:{
              avatar:urls[6].url,
              cloudinary_id:urls[6].id
            }
          });

        res.status(201).json({ 
            user:profile.user, 
            sex:profile.sex, 
            department:profile.department, 
            level:profile.level,
            institution:profile.institution,
            description:profile.description,
            attributeOne: profile.attributeOne,
            attributeTwo:profile.attributeTwo,
            attributeThree:profile.attributeThree, 
            attributeFour:profile.attributeFour, 
            attributeFive:profile.attributeFive, 
            attributeSix:profile.attributeSix,
            profilePic:profile.profilePic,
            pictureOne:profile.pictureOne,
            pictureTwo:profile.pictureTwo,
            pictureThree:profile.pictureThree,
            pictureFour:profile.pictureFour,
            pictureFive:profile.pictureFive,
            pictureSix:profile.pictureSix
        });
      }
    catch(err) {
          const errors = handleErrors(err);
        res.status(400).json({errors});
    }
  }

  module.exports.profile_get = async (req, res) => {
    const { department, level, sex } = req.query
  
    try {
        const profile = await Profile.find({
          $or:[
                {sex:{$regex:sex, $options:'i'}},
                {department:{$regex:department, $options:'i'}}, {level:{$regex:level, $options:'i'}}
              ]
        }).populate("user") 

        res.status(201).json(profile)
        
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({errors});
    }
   
  }


  module.exports.profile_get_id = async (req, res) => {
      const id = req.params.id
  
    try {
        const profile = await Profile.findById(id).populate("user") 
        res.status(201).json(profile)
        
    }
    catch(err) {
      const errors = handleErrors(err)
      res.status(400).json({errors});
    }
   
  }

  module.exports.profile_put_id = async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images')

        const files = req.files;
        const urls = []
        for (const i in files){
            const { path } = files[i][0]
            const newpath = await uploader(path)
            urls.push(newpath)
            fs.unlinkSync(path)
        }


    const id = req.params.id


    const update = {...req.body, profilePic:{
      avatar:urls[0].url,
      cloudinary_id:urls[0].id
    },
    pictureOne:{
      avatar:urls[1].url,
      cloudinary_id:urls[1].id
    },
    pictureTwo:{
      avatar:urls[2].url,
      cloudinary_id:urls[2].id
    },
    pictureThree:{
      avatar:urls[3].url,
      cloudinary_id:urls[3].id
    },
    pictureFour:{
      avatar:urls[4].url,
      cloudinary_id:urls[4].id
    },
    pictureFive:{
      avatar:urls[5].url,
      cloudinary_id:urls[5].id
    },
    pictureSix:{
      avatar:urls[6].url,
      cloudinary_id:urls[6].id
    }}


  try {
      const profile = await Profile.findByIdAndUpdate(id, update, picUpdate, { useFindAndModify: false})


      res.status(201).json(profile)
      
  }
  catch(err) {
    const errors = handleErrors(err)
    res.status(400).json({errors});
  }
 
}

