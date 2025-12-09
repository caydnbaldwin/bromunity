const express = require('express');
const router = express.Router();
const profilesController = require('./ProfilesController');

router.get('/profile/:person_id', profilesController.getProfilePage);

module.exports = router;