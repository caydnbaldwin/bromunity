const express = require('express');
const router = express.Router();
const friendshipsController = require('./FriendshipsController');

router.get('/nofriend/:person_id', friendshipsController.getNoFriend);
router.get('/yesfriend/:person_id', friendshipsController.getYesFriend);
router.get('/accept/:person_id', friendshipsController.acceptFriend);
router.get('/decline/:person_id', friendshipsController.declineFriend);
router.get('/cancel/:person_id', friendshipsController.cancelFriend);
router.get('/pending', friendshipsController.getPendingPage);
router.get('/accepted', friendshipsController.getAcceptedPage);

module.exports = router;