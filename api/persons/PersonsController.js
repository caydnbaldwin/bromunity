const personsService = require('./PersonsService');

class PersonsController {
  async getOnboardingPage(req, res) {
    try {
      const person = await personsService.getOnboardingPage(req.session);
      if (person) {
        req.session.person = person;
        // User is already onboarded, now we call the route to load the profile page... see file:///c:/users/caydn/bromunity/index.js#L38
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

  async getPersonsPage(req, res) {
    try {
      const persons = await personsService.getPersons(req.session);
      res.render('persons-page', {errorMessage: null, persons, session: req.session, query: ''});
    } catch (error) {
      res.render('persons-page', {errorMessage: error, persons: [], session: req.session, query: ''});
    };
  };

  async searchPerson(req, res) {
    try {
      const {query = ''} = req.query;
      const persons = await personsService.searchPersons(req.session, query);
      res.render('persons-page', {errorMessage: null, persons, session: req.session, query});
    } catch (error) {
      const safeQuery = typeof req.query?.query === 'string' ? req.query.query : '';
      res.render('persons-page', {errorMessage: error, persons: [], session: req.session, query: safeQuery});
    };
  };

  async getEditPersonPage(req, res) {
    const {person_id} = req.params;
    try {
      const person = await personsService.getEditPerson(req.session, person_id);
      res.render('edit-person-page', {errorMessage: null, session: req.session, person});
    } catch (error) {
      const errorMessage = error?.message || error;
      res.render('edit-person-page', {errorMessage, session: req.session, person: null});
    };
  };

  async postEditPerson(req, res) {
    const {person_id} = req.params;
    try {
      await personsService.updatePerson(req.session, person_id, req.body);
      res.redirect('/persons/persons');
    } catch (error) {
      const errorMessage = error?.message || error;
      const fallbackPerson = {
        person_id,
        authentication_id: req.body.authentication_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        role: req.body.role,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code
      };

      if (error.status === 403) {
        res.render('persons-page', {errorMessage, persons: [], session: req.session, query: ''});
        return;
      };

      res.render('edit-person-page', {errorMessage, session: req.session, person: fallbackPerson});
    };
  };

  async deletePerson(req, res) {
    const {person_id} = req.params;
    try {
      await personsService.deletePerson(req.session, person_id);
      res.redirect('/persons/persons');
    } catch (error) {
      const query = typeof req.query?.query === 'string' ? req.query.query : '';
      const errorMessage = error?.message || error;
      res.render('persons-page', {errorMessage, persons: [], session: req.session, query});
    };
  };
};

module.exports = new PersonsController();