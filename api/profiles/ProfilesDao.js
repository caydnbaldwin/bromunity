const knex = require('../../utilities/database');

class ProfilesDao {
  async getProfilePage(person_id) {
    try {
      return await knex
        .select('*')
        .from('profiles')
        .where('person_id', person_id)
        .leftJoin('games', 'profiles.game_id', 'games.game_id');
    } catch (err) {
      const error = new Error('Onboarding failed.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async getAddProfilePage() {
    try {
      return await knex
        .select('*')
        .from('games')
    } catch (err) {
      const error = new Error('Onboarding failed.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async postAddProfile(person_id, game_id, gaming_platform, description, hours_of_gameplay) {
    try {
      return await knex('profiles')
        .insert({
          person_id,
          game_id,
          gaming_platform,
          description,
          hours_of_gameplay
        })
        .returning('*');
    } catch (err) {
      const error = new Error('Failed to create profile.');
      error.status = 403;
      error.cause = err ? err : 'Error';
    };
  };

  async postEditProfile(person_id, game_id, gaming_platform, description, hours_of_gameplay) {
    try {
      return await knex('profiles')
        .where('person_id', person_id)
        .andWhere('game_id', game_id)
        .update({
          gaming_platform,
          description,
          hours_of_gameplay
        })
        .returning('*');
    } catch (err) {
      const error = new Error('Failed to update profile.');
      error.status = 403;
      error.cause = err ? err : 'Error';
    };
  }

  async deleteProfile(person_id, game_id) {
    try {
      return await knex('profiles')
        .where('person_id', person_id)
        .andWhere('game_id', game_id)
        .del()
        .returning('*');
    } catch (err) {
      const error = new Error('Failed to delete profile.');
      error.status = 403;
      error.cause = err ? err : 'Error';
    };
  };
};

module.exports = new ProfilesDao();