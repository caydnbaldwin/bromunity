const friendshipsDao = require('./FriendshipsDao');

class FriendshipsService {
  async getNoFriend(session, params) {
    try {
      const person_id = session.person.person_id;
      const friend_id = params.person_id;
      const sorted_ids = [person_id, friend_id].sort((a, b) => a - b);
      const friendship = await friendshipsDao.getNoFriend(sorted_ids[0], sorted_ids[1]);
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
      const sorted_ids = [person_id, friend_id].sort((a, b) => a - b);
      const friendship = await friendshipsDao.getYesFriend(sorted_ids[0], sorted_ids[1]);
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