const profilesService = require('./ProfilesService');
const friendshipsService = require('../friendships/FriendshipsService');

class ProfilesController {
  async getFeedPage(req, res) {
    try {
      const {person, profiles} = await profilesService.getFeedPage(req.session);
      const friendships = await friendshipsService.getPendingPage(req.session);
      req.session.feed = req.session.feed || {};
      req.session.feed.person = person;
      req.session.feed.profiles = profiles;
      req.session.friendships = friendships;
      console.log('req.session.feed.profiles:', req.session.feed.profiles)
      res.render('feed-page', {errorMessage: null, session: req.session});
    } catch (error) {
      res.render('feed-page', {errorMessage: error, session: req.session});
    };
  };

  async getProfilePage(req, res) {
    try {
      const targetPersonId = req.params.person_id ? parseInt(req.params.person_id, 10) : req.session.person.person_id;
      const {profiles, friendships, viewedPerson} = await profilesService.getProfilePage(req.session, targetPersonId);
      req.session.profiles = profiles;
      req.session.friendships = friendships;
      req.session.viewed_person_id = targetPersonId;
      const isOwnProfile = targetPersonId === req.session.person.person_id;
      res.render('profile-page', {errorMessage: null, session: req.session, isOwnProfile, viewedPerson});
    } catch (error) {
      res.render('profile-page', {errorMessage: error, session: req.session, isOwnProfile: true, viewedPerson: null});
    };
  };

  async getAddProfilePage(req, res) {
    try {
      const games = await profilesService.getAddProfilePage();
      const friendships = await friendshipsService.getPendingPage(req.session);
      req.session.games = games;
      req.session.friendships = friendships;
      res.render('add-profile-page', {errorMessage: null, session: req.session});
    } catch (error) {
      res.render('add-profile-page', {errorMessage: error, session: req.session});
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
      const friendships = await friendshipsService.getPendingPage(req.session);
      req.session.games = games;
      req.session.friendships = friendships;
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