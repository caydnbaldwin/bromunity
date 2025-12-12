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

  async acceptFriend(session, params) {
    try {
      const person_id = session.person.person_id;
      const friend_id = params.person_id;
      const friendship = await friendshipsDao.acceptFriend(person_id, friend_id);
      if (friendship) {
        return friendship[0];
      } else {
        throw new Error('Failed to accept friendship.');
      };
    } catch (error) {
      throw error;
    };
  };

  async declineFriend(session, params) {
    try {
      const person_id = session.person.person_id;
      const friend_id = params.person_id;
      const friendship = await friendshipsDao.declineFriend(person_id, friend_id);
      if (friendship) {
        return friendship[0];
      } else {
        throw new Error('Failed to decline friendship.');
      };
    } catch (error) {
      throw error;
    };
  };

  async cancelFriend(session, params) {
    try {
      const person_id = session.person.person_id;
      const friend_id = params.person_id;
      const result = await friendshipsDao.cancelFriend(person_id, friend_id);
      if (result !== undefined) {
        return result;
      } else {
        throw new Error('Failed to cancel friendship.');
      };
    } catch (error) {
      throw error;
    };
  };
  
  async getPendingPage(session) {
    try {
      let friendships = await friendshipsDao.getPendingPage(session.person.person_id);
      if (friendships) {
        let sent = [];
        let received = [];
        for (const friendship of friendships) {
          if (friendship.sender_id === session.person.person_id) {
            sent.push(friendship);
          } else {
            received.push(friendship);
          };
        };
        friendships = {
          sent,
          received
        };
        console.log('friendships:', friendships);
        return friendships;
      } else {
        throw new Error('Failed to get pending friendship requests.');
      };
    } catch (error) {
      throw error;
    };
  };

  async getAcceptedPage(session) {
    try {
      const friends = await friendshipsDao.getAcceptedPage(session.person.person_id);
      if (friends) {
        console.log('friends:', friends);
        return friends;
      } else {
        throw new Error('Failed to get accepted friendships.');
      };
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new FriendshipsService();