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

  async acceptFriend(person_id, friend_id) {
    try {
      const sorted_ids = [person_id, friend_id].sort((a, b) => a - b);
      return await knex('friendships')
        .where('person_id_1', sorted_ids[0])
        .where('person_id_2', sorted_ids[1])
        .update({ status: 'Accepted' })
        .returning('*');
    } catch (err) {
      const error = new Error('Failed to accept friendship.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async declineFriend(person_id, friend_id) {
    try {
      const sorted_ids = [person_id, friend_id].sort((a, b) => a - b);
      return await knex('friendships')
        .where('person_id_1', sorted_ids[0])
        .where('person_id_2', sorted_ids[1])
        .update({ status: 'Declined' })
        .returning('*');
    } catch (err) {
      const error = new Error('Failed to decline friendship.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async cancelFriend(person_id, friend_id) {
    try {
      const sorted_ids = [person_id, friend_id].sort((a, b) => a - b);
      return await knex('friendships')
        .where('person_id_1', sorted_ids[0])
        .where('person_id_2', sorted_ids[1])
        .del();
    } catch (err) {
      const error = new Error('Failed to cancel friendship.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async getPendingPage(person_id) {
    try {
      const friendships = await knex
        .select(
          'f.person_id_1',
          'f.person_id_2',
          'f.status',
          'f.sender_id',
          'p1.first_name as person_id_1_first_name',
          'p1.last_name as person_id_1_last_name',
          'p1.date_of_birth as person_id_1_date_of_birth',
          'p2.first_name as person_id_2_first_name',
          'p2.last_name as person_id_2_last_name',
          'p2.date_of_birth as person_id_2_date_of_birth'
        )
        .from('friendships as f')
        .leftJoin('persons as p1', 'f.person_id_1', 'p1.person_id')
        .leftJoin('persons as p2', 'f.person_id_2', 'p2.person_id')
        .where(function() {
          this.where('f.person_id_1', person_id)
              .orWhere('f.person_id_2', person_id)
        })
        .andWhere('f.status', 'Pending')
      console.log('[FriendshipsDao] friendships:', friendships);
      return friendships;
    } catch (err) {
      const error = new Error('Failed to get pending friendships.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async getAcceptedPage(person_id) {
    try {
      const friends = await knex
        .select(
          'f.person_id_1',
          'f.person_id_2',
          'f.status',
          'f.sender_id',
          'p1.first_name as person_id_1_first_name',
          'p1.last_name as person_id_1_last_name',
          'p1.date_of_birth as person_id_1_date_of_birth',
          'p2.first_name as person_id_2_first_name',
          'p2.last_name as person_id_2_last_name',
          'p2.date_of_birth as person_id_2_date_of_birth'
        )
        .from('friendships as f')
        .leftJoin('persons as p1', 'f.person_id_1', 'p1.person_id')
        .leftJoin('persons as p2', 'f.person_id_2', 'p2.person_id')
        .where(function() {
          this.where('f.person_id_1', person_id)
              .orWhere('f.person_id_2', person_id)
        })
        .andWhere('f.status', 'Accepted')
      console.log('[FriendshipsDao] friends:', friends);
      return friends;
    } catch (err) {
      const error = new Error('Failed to get accepted friendships.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };
};

module.exports = new FriendshipsDao();