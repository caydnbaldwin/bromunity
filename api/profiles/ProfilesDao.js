const knex = require('../../utilities/database');

class ProfilesDao {
  async getFeedPage(person_id) {
    try {
      const person = await knex('persons')
        .select('*')
        .whereNot('person_id', person_id)
        .whereNotIn('person_id', function () {
          this.select('person_id_1')
            .from('friendships')
            .where('person_id_2', person_id)
            .union(function () {
              this.select('person_id_2')
                .from('friendships')
                .where('person_id_1', person_id);
            });
        })
        .orderBy('person_id', 'asc')
        .first();
      let profiles;
      if (person) {
        profiles = await knex
          .select('*')
          .from('profiles')
          .leftJoin('games', 'profiles.game_id', 'games.game_id')
          .where('person_id', person.person_id);
      };
      return {person: person || [], profiles: profiles || []};
    } catch (err) {
      const error = new Error('Failed to fetch feed.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async getProfilePage(person_id) {
    try {
      const profiles = await knex
        .select('*')
        .from('profiles')
        .where('person_id', person_id)
        .leftJoin('games', 'profiles.game_id', 'games.game_id');
      const pending = await knex
        .count('* as pending')
        .from('friendships')
        .where(function() {
          this.where('person_id_1', person_id)
              .orWhere('person_id_2', person_id)
        })
        .andWhere('status', 'Pending')
      const accepted = await knex
        .count('* as accepted')
        .from('friendships')
        .where(function() {
          this.where('person_id_1', person_id)
              .orWhere('person_id_2', person_id)
        })
        .andWhere('status', 'Accepted')
      return {
        profiles,
        friendships: {
          pending: pending[0],
          accepted: accepted[0]
        }
      };
    } catch (err) {
      const error = new Error('Onboarding failed.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async getPersonById(person_id) {
    try {
      const person = await knex('persons')
        .select('person_id', 'first_name', 'last_name')
        .where('person_id', person_id)
        .first();
      return person || null;
    } catch (err) {
      const error = new Error('Failed to fetch person.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    }
  }

  async getFriendshipCounts(person_id) {
    try {
      const pending = await knex
        .count('* as pending')
        .from('friendships')
        .where(function() {
          this.where('person_id_1', person_id)
              .orWhere('person_id_2', person_id)
        })
        .andWhere('status', 'Pending');
      const accepted = await knex
        .count('* as accepted')
        .from('friendships')
        .where(function() {
          this.where('person_id_1', person_id)
              .orWhere('person_id_2', person_id)
        })
        .andWhere('status', 'Accepted');
      return {
        pending: pending[0],
        accepted: accepted[0]
      };
    } catch (err) {
      const error = new Error('Failed to get friendship counts.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    }
  }

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

  async getProfileByIds(person_id, game_id) {
    try {
      return await knex('profiles')
        .select('*')
        .leftJoin('games', 'profiles.game_id', 'games.game_id')
        .where('profiles.person_id', person_id)
        .andWhere('profiles.game_id', game_id)
        .first();
    } catch (err) {
      const error = new Error('Failed to fetch profile.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    }
  }
};

module.exports = new ProfilesDao();