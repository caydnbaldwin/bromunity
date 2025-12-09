const authenticationService = require('./AuthenticationService');

class AuthenticationController {
  getSignupPage(req, res) {
    res.render('signup-page', {errorMessage: null});
  };

  async postSignup(req, res) {
    try {
      const authentication = await authenticationService.postSignup(req.body);
      req.session.authentication = authentication;
      res.redirect('/persons/onboarding');
    } catch (error) {
      res.render('signup-page', {errorMessage: error});
    }
  };

  getLoginPage(req, res) {
    res.render('login-page', {errorMessage: null});
  };

  async postLogin(req, res) {
    try {
      const authentication = await authenticationService.postLogin(req.body);
      req.session.authentication = authentication;
      res.redirect('/persons/onboarding');
    } catch (error) {
      res.render('login-page', {errorMessage: error})
    }
  };

  getLogout(req, res) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  };
};

module.exports = new AuthenticationController();