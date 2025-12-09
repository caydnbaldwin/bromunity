const express = require('express');
const router = express.Router();
const personsController = require('./PersonsController');

router.get('/onboarding', personsController.getOnboardingPage);
router.post('/onboarding', personsController.postOnboarding);

module.exports = router;