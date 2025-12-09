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
};

module.exports = new ProfilesDao();