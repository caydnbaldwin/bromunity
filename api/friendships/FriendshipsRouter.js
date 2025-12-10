const express = require('express');
const router = express.Router();
const friendshipsController = require('./FriendshipsController');

router.get('/nofriend/:person_id', friendshipsController.getNoFriend);
router.get('/yesfriend/:person_id', friendshipsController.getYesFriend);

module.exports = router;