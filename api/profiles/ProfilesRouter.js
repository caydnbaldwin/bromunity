const express = require('express');
const router = express.Router();
const profilesController = require('./ProfilesController');

router.get('/feed', profilesController.getFeedPage);
router.get('/profile/add', profilesController.getAddProfilePage);
// POST to create
router.post('/profile/add', profilesController.postAddProfile);
router.get('/profile/edit/:person_id/:game_id', profilesController.getEditProfile);
// POST to update
router.post('/profile/edit/:person_id/:game_id', profilesController.postEditProfile);
// GET to delete
router.get('/profile/delete/:person_id/:game_id', profilesController.deleteProfile);
// catch the /profile/:person_id from GET /profiles/profile/:person_id to route to the profiles controller
router.get('/profile/:person_id', profilesController.getProfilePage);

module.exports = router;