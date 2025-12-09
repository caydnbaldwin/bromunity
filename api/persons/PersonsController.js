const personsService = require('./PersonsService');

class PersonsController {
  async getOnboardingPage(req, res) {
    try {
      const person = await personsService.getOnboardingPage(req.session);
      if (person) {
        req.session.person = person;
        res.redirect(`/profiles/profile/${person.person_id}`);
      } else {
        res.render('onboarding-page', {errorMessage: null, session: req.session});
      };
    } catch (error) {
      res.render('onboarding-page', {errorMessage: error});
    };
  };

  async postOnboarding(req, res) {
    try {
      const person = await personsService.postOnboarding(req.session, req.body);
      if (person) {
        req.session.person = person;
        res.redirect(`/profiles/profile/${person.person_id}`);
      } else {
        res.render('onboarding-page', {errorMessage: error, session: req.sesion});
      };
    } catch (error) {
      res.render('onboarding-page', {errorMessage: error, session: req.sesion});
    };
  };
};

module.exports = new PersonsController();