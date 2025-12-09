const knex = require('../../utilities/database');

class PersonsDao {
  async getOnboardingPage(authentication_id) {
    try {
      return await knex
        .select('*')
        .from('persons')
        .where('authentication_id', authentication_id)
    } catch (err) {
      const error = new Error('Onboarding failed.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async postOnboarding(first_name, last_name, date_of_birth, phone_number, gender, street_address, city, state, postal_code, authentication_id) {
    try {
      return await knex('persons')
        .insert({
          first_name,
          last_name,
          date_of_birth,
          phone_number,
          gender,
          street_address,
          city,
          state,
          postal_code,
          authentication_id
        })
        .returning('*')
    } catch (err) {
      const error = new Error('Onboarding failed.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw err;
    };
  };
};

module.exports = new PersonsDao();