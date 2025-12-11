const knex = require('../../utilities/database');

class FriendshipsDao {
  async getNoFriend(person_id, friend_id) {
    try {
      const sender_id = person_id;
      const sorted_ids = [person_id, friend_id].sort((a, b) => a - b);
      return await knex('friendships')
        .insert({
          person_id_1: sorted_ids[0],
          person_id_2: sorted_ids[1],
          'status': 'Declined',
          sender_id
        })
        .returning('*');
    } catch (err) {
      const error = new Error('Failed to decline friendship.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };
  
  async getYesFriend(person_id, friend_id) {
    try {
      const sender_id = person_id;
      const sorted_ids = [person_id, friend_id].sort((a, b) => a - b);
      return await knex('friendships')
        .insert({
          person_id_1: sorted_ids[0],
          person_id_2: sorted_ids[1],
          'status': 'Pending',
          sender_id
        })
        .returning('*');
    } catch (err) {
      console.log(err);
      const error = new Error('Failed to request friendship.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };
};

module.exports = new FriendshipsDao();