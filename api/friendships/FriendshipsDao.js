const knex = require('../../utilities/database');

class FriendshipsDao {
  async getNoFriend(person_id_1, person_id_2) {
    try {
      return await knex('friendships')
        .insert({
          person_id_1,
          person_id_2,
          'status': 'Declined'
        })
        .returning('*');
    } catch (err) {
      const error = new Error('Failed to decline friendship.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };
  
  async getYesFriend(person_id_1, person_id_2) {
    try {
      return await knex('friendships')
        .insert({
          person_id_1,
          person_id_2,
          'status': 'Pending'
        })
        .returning('*');
    } catch (err) {
      const error = new Error('Failed to request friendship.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };
};

module.exports = new FriendshipsDao();