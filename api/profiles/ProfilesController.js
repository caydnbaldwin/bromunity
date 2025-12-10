const profilesService = require('./ProfilesService');

class ProfilesController {
  async getProfilePage(req, res) {
    try {
      const profiles = await profilesService.getProfilePage(req.session);
      req.session.profiles = profiles;
      if (profiles > 0) {
        res.render('profile-page', {errorMessage: null, session: req.session});
      } else {
        res.render('profile-page', {errorMessage: null, session: req.session});
      };
    } catch (error) {
      res.render('profile-page', {errorMessage: error, session: req.session});
    };
  };

  async getAddProfilePage(req, res) {
    try {
      const games = await profilesService.getAddProfilePage();
      req.session.games = games;
      res.render('add-profile-page', {errorMessage: null, session: req.session});
    } catch (error) {
      res.render('profile-page', {errorMessage: error, session: req.session});
    };
  };

  async postAddProfile(req, res) {
    try {
      await profilesService.postAddProfile(req.session, req.body);
      res.redirect(`/profiles/profile/${req.session.person.person_id}`);
    } catch (error) {
      res.render('add-profile-page', {errorMessage: error, session: req.session});
    };
  };

  async getEditProfile(req, res) {
    try {
      const games = await profilesService.getAddProfilePage();
      req.session.games = games;
      res.render('edit-profile-page', {errorMessage: null, session: req.session, params: req.params});
    } catch (error) {
      res.render('edit-profile-page', {errorMessage: error, session: req.session, params: req.params});
    };
  };

  async postEditProfile(req, res) {
    try {
      await profilesService.postEditProfile(req.session, req.body);
      res.redirect(`/profiles/profile/${req.session.person.person_id}`);
    } catch (error) {
      res.render('edit-profile-page', {errorMessage: error, session: req.session, params: req.params});
    };
  };

  async deleteProfile(req, res) {
    try {
      const profile = await profilesService.deleteProfile(req.params);
      res.redirect(`/profiles/profile/${profile.person_id}`);
    } catch (error) {
      res.render('profile-page', {errorMessage: error, session: req.session});
    };
  };
};

module.exports = new ProfilesController();