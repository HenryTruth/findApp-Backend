const { Router } = require('express');
const authController = require('../controller/authController');
const multerUploads = require('../utils/multer')
const auth = require('../middleware/auth')
const router = Router();





router.post('/signup', authController.signup_post);
router.post('/profile', multerUploads,auth, authController.profile_post);
router.post('/login', authController.login_post);
router.get('/profile', authController.profile_get);
router.get('/profile/:id', authController.profile_get_id);
router.put('/profile/:id', multerUploads,  auth, authController.profile_put_id);

module.exports = router;