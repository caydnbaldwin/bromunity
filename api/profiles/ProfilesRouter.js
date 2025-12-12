const express = require('express');
const router = express.Router();
const profilesController = require('./ProfilesController');

router.get('/feed', profilesController.getFeedPage);
router.get('/profile/add', profilesController.getAddProfilePage);
router.post('/profile/add', profilesController.postAddProfile);
router.get('/profile/edit/:person_id/:game_id', profilesController.getEditProfile);
router.post('/profile/edit/:person_id/:game_id', profilesController.postEditProfile);
router.get('/profile/delete/:person_id/:game_id', profilesController.deleteProfile);
router.get('/profile/:person_id', profilesController.getProfilePage);

module.exports = router;