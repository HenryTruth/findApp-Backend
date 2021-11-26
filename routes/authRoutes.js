const { Router } = require('express');
const express = require('express')
const authController = require('../controller/authController');
const cloudinary = require('cloudinary').v2
const uploads = require('../utils/multer')
const auth = require('../middleware/auth')

cloudinary.config({ 
    cloud_name: "dyojwpsfb", 
    api_key :'561691254166548', 
    api_secret : "k9tjvzXstvMkFIuqlJFm4_t_tcA",
})

const cpUpload = uploads.fields([
    {name:'profilePic', maxCount:1},
    { name: 'pictureOne', maxCount: 1 },
    { name: 'pictureTwo', maxCount: 1 },
    { name: 'pictureThree', maxCount: 1 },
    { name: 'pictureFour', maxCount: 1 },
    { name: 'pictureFive', maxCount: 1 },
    { name: 'pictureSix', maxCount: 1 }
])


const router = Router();
// const app = express();


router.post('/signup', authController.signup_post);
router.post('/profile', cpUpload, auth, authController.profile_post);
router.post('/login', authController.login_post);
router.get('/profile', authController.profile_get);
router.get('/profile/:id', authController.profile_get_id);
router.put('/profile/:id', cpUpload, auth, authController.profile_put_id);

module.exports = router;