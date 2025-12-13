const express = require('express');
const router = express.Router();
const personsController = require('./PersonsController');

router.get('/onboarding', personsController.getOnboardingPage);
router.post('/onboarding', personsController.postOnboarding);
router.get('/persons', personsController.getPersonsPage);
router.get('/searchPerson', personsController.searchPerson);
router.get('/deletePerson/:person_id', personsController.deletePerson);
router.get('/editPerson/:person_id', personsController.getEditPersonPage);
router.post('/editPerson/:person_id', personsController.postEditPerson);

module.exports = router;