const User = require("../models/User");
const Profile = require("../models/Profile")
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
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
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};


module.exports.signup_post = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
  
    try {
      const user = await User.create({ username, email, password });
      const token = createToken(user._id);
      res.status(201).json({ id: user._id, username: user.username, token:token  });
    }
    catch(err) {
    //   const errors = handleErrors(err);
    console.log(err)
      res.status(400).json(err);
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
    const {user, sex, department, level, description, attributeOne,attributeTwo, attributeThree, attributeFour, attributeFive, attributeSix} = req.body;
  
    try {
        const profile = await Profile.create({ user, sex, department, level, description, attributeOne,attributeTwo, attributeThree, attributeFour, attributeFive, attributeSix});

        res.status(201).json({ 
            user:profile.user, 
            sex:profile.sex, 
            department:profile.department, 
            level:profile.level, 
            description:profile.description,
            attributeOne: profile.attributeOne,attributeTwo:profile.attributeTwo, attributeThree:profile.attributeThree, attributeFour:profile.attributeFour, 
            attributeFive:profile.attributeFive, 
            attributeSix:profile.attributeSix, 
        });
      }
    catch(err) {
        //   const errors = handleErrors(err);
        console.log(err)
        res.status(400).json(err);
    }
  }

  module.exports.profile_get = async (req, res) => {
  
    try {
        const profile = await Profile.find().populate("user") 

        res.status(201).json(profile)
        
    }
    catch(err) {
    //   const errors = handleErrors(err);
    console.log(err)
      res.status(400).json(err);
    }
   
  }


  module.exports.profile_get_id = async (req, res) => {
      const id = req.params.id
  
    try {
        const profile = await Profile.findById(id).populate("user") 

        res.status(201).json(profile)
        
    }
    catch(err) {
    //   const errors = handleErrors(err);
    console.log(err)
      res.status(400).json(err);
    }
   
  }

  module.exports.profile_get_id = async (req, res) => {
    const id = req.params.id

    const {sex, department, level, description, attributeOne,attributeTwo, attributeThree, attributeFour, attributeFive, attributeSix} = req.body;

  try {
      const profile = await Profile.findByIdAndUpdate(id, {
        $set: {
            sex,
            department,
            level,
            description,
            attributeOne,
            attributeTwo,
            attributeThree,
            attributeFour,
            attributeFive,
            attributeSix
        }
      },{
        useFindAndModify:false
    }).populate("user") 

      res.status(201).json(profile)
      
  }
  catch(err) {
  //   const errors = handleErrors(err);
  console.log(err)
    res.status(400).json(err);
  }
 
}