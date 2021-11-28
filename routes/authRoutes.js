const { Router } = require('express');
const authController = require('../controller/authController');
const uploads = require('../utils/multer')
const auth = require('../middleware/auth')
const router = Router();



const cpUpload = uploads.fields([
    {name:'profilePic', maxCount:1},
    { name: 'pictureOne', maxCount: 1 },
    { name: 'pictureTwo', maxCount: 1 },
    { name: 'pictureThree', maxCount: 1 },
    { name: 'pictureFour', maxCount: 1 },
    { name: 'pictureFive', maxCount: 1 },
    { name: 'pictureSix', maxCount: 1 }
])



router.post('/signup', authController.signup_post);
router.post('/profile', cpUpload, auth, authController.profile_post);
router.post('/login', authController.login_post);
router.get('/profile', authController.profile_get);
router.get('/profile/:id', authController.profile_get_id);
router.put('/profile/:id', cpUpload, auth, authController.profile_put_id);

module.exports = router;