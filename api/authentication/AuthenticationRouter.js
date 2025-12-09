const express = require('express');
const router = express.Router();
const authenticationController = require('./AuthenticationController');

router.get('/signup', authenticationController.getSignupPage);
router.post('/signup', authenticationController.postSignup);
router.get('/login', authenticationController.getLoginPage);
router.post('/login', authenticationController.postLogin);
router.get('/logout', authenticationController.getLogout);

module.exports = router;