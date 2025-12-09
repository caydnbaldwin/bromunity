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
};

module.exports = new ProfilesController();