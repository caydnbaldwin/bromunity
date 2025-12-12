const friendshipsService = require('./FriendshipsService');
const profilesService = require('../profiles/ProfilesService');

class FriendshipsController {
  async getNoFriend(req, res) {
    try {
      await friendshipsService.getNoFriend(req.session, req.params);
      res.redirect('/profiles/feed');
    } catch (error) {
      res.render('feed-page', {errorMessage: error, session: req.session});
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

  async acceptFriend(req, res) {
    try {
      await friendshipsService.acceptFriend(req.session, req.params);
      const {profiles, friendships} = await profilesService.getProfilePage(req.session);
      req.session.friendships = friendships;
      res.redirect('/friendships/pending');
    } catch (error) {
      res.render('pending-page', {errorMessage: error, session: req.session});
    };
  };

  async declineFriend(req, res) {
    try {
      await friendshipsService.declineFriend(req.session, req.params);
      const friendships = await friendshipsService.getPendingPage(req.session);
      req.session.friendships = friendships;
      res.redirect('/friendships/pending');
    } catch (error) {
      res.render('pending-page', {errorMessage: error, session: req.session});
    };
  };

  async cancelFriend(req, res) {
    try {
      await friendshipsService.cancelFriend(req.session, req.params);
      const friendships = await friendshipsService.getPendingPage(req.session);
      req.session.friendships = friendships;
      res.redirect('/friendships/pending');
    } catch (error) {
      res.render('pending-page', {errorMessage: error, session: req.session});
    };
  };

  async getPendingPage(req, res) {
    try {
      const friendships = await friendshipsService.getPendingPage(req.session);
      const {profiles, friendships: counts} = await profilesService.getProfilePage(req.session);
      req.session.friendships = friendships;
      req.session.friendships.accepted = counts.accepted;
      console.log('[FriendshipsController] friendships:', friendships);
      res.render('pending-page', {errorMessage: null, session: req.session});
    } catch (error) {
      res.render('pending-page', {errorMessage: error, session: req.session});
    };
  };

  async getAcceptedPage(req, res) {
    try {
      const friends = await friendshipsService.getAcceptedPage(req.session);
      const {profiles, friendships: counts} = await profilesService.getProfilePage(req.session);
      const pendingFriendships = await friendshipsService.getPendingPage(req.session);
      req.session.accepted = friends;
      req.session.friendships = {
        ...pendingFriendships,
        accepted: counts.accepted
      };
      console.log('[FriendshipsController] friends:', friends);
      res.render('friends-page', {errorMessage: null, session: req.session});
    } catch (error) {
      res.render('friends-page', {errorMessage: error, session: req.session});
    };
  };
};

module.exports = new FriendshipsController();