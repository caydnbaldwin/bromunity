const friendshipsService = require('./FriendshipsService');

class FriendshipsController {
  async getNoFriend(req, res) {
    try {
      await friendshipsService.getNoFriend(req.session, req.params);
      res.redirect('/profiles/feed');
    } catch (error) {
      res.render('profiles/feed', {errorMessage: error, session: req.session});
    };
  };
  
  async getYesFriend(req, res) {
    try {
      await friendshipsService.getYesFriend(req.session, req.params);
      res.redirect('/profiles/feed');
    } catch (error) {
      res.render('feed-page', {errorMessage: error, session: req.session});
    };
  };
};

module.exports = new FriendshipsController();