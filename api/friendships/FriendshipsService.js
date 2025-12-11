const friendshipsDao = require('./FriendshipsDao');

class FriendshipsService {
  async getNoFriend(session, params) {
    try {
      const person_id = session.person.person_id;
      const friend_id = params.person_id;
      const friendship = await friendshipsDao.getNoFriend(person_id, friend_id);
      if (friendship) {
        return friendship[0];
      } else {
        throw new Error('Failed to decline friendship.');
      };
    } catch (error) {
      throw error;
    };
  };
  
  async getYesFriend(session, params) {
    try {
      const person_id = session.person.person_id;
      const friend_id = params.person_id;
      const friendship = await friendshipsDao.getYesFriend(person_id, friend_id);
      if (friendship) {
        return friendship[0];
      } else {
        throw new Error('Failed to request friendship.');
      };
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new FriendshipsService();