const User = require("../models/User");
const Profile = require("../models/Profile")
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv');
let streamifier = require('streamifier');

dotenv.config()

cloudinary.config({ 
    cloud_name: "dyojwpsfb", 
    api_key : "561691254166548",
    api_secret : "k9tjvzXstvMkFIuqlJFm4_t_tcA",
})


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

const tokenLimit = 7 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: tokenLimit
  });
};


module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const user = await User.create({ username, email, password });
      const token = createToken(user._id);
      expirationDate = tokenLimit
      res.status(201).json({ id: user._id, username: user.username, token:token, expiresIn:expirationDate });
    }
    catch(err) {
      console.log(err)
      const errors = handleErrors(err);
      res.status(400).json({errors});
    }
   
  }


  module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      expirationDate = tokenLimit
      res.status(200).json({ id: user._id, email: user.email, token:token, expirationDate: tokenLimit  });
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
      attribureSix,
      attributeSeven,
      attributeEight,
    } = req.body;

  
    try {

      if(req.file){

        let uploadFromBuffer = (req) => {
          return new Promise((resolve, reject) => {
            let cld_upload_stream = cloudinary.uploader.upload_stream(
              {
                folder: "foo"
              },
              (error, result) => {
    
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                 }
               }
          );
    
          streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream)
          })
        }

        let result = await uploadFromBuffer(req)

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
          attribureSix,
          attributeSeven,
          attributeEight,
          profilePic:result.url,
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
          attribureSix:profile.attributeSix,
          attributeSeven:profile.attributeSeven,
          attributeEight:profile.atrributeEight,
          profilePic:profile.profilePic,
      });
      }

      }
    catch(err) {
      console.log(err)
          const errors = handleErrors(err);
        res.status(400).json(err);
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
      // const errors = handleErrors(err);
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
      const errors = handleErrors(err)
      res.status(400).json({errors});
    }
   
  }

  module.exports.profile_put_id = async (req, res) => {

    
    


  try {
    if(req.file){

      let uploadFromBuffer = (req) => {
        return new Promise((resolve, reject) => {
          let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
              folder: "foo"
            },
            (error, result) => {
  
              if (result) {
                resolve(result);
              } else {
                reject(error);
               }
             }
        );
  
        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream)
        })
      }

      let result = await uploadFromBuffer(req)
      const id = req.params.id


    const update = {...req.body, profilePic:result.url}
    const profile = await Profile.findByIdAndUpdate(id, update, picUpdate, { useFindAndModify: false})
    res.status(201).json(profile)

    }
      
  }
  catch(err) {
    const errors = handleErrors(err)
    res.status(400).json({errors});
  }
 
}

