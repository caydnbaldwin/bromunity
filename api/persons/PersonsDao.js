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

  async getPersons() {
    try {
      return await knex('persons')
        .select(
          'persons.person_id',
          'persons.first_name',
          'persons.last_name',
          'persons.date_of_birth',
          'persons.phone_number',
          'persons.gender',
          'persons.street_address',
          'persons.city',
          'persons.state',
          'persons.postal_code',
          'authentication.authentication_id',
          'authentication.email',
          'authentication.role'
        )
        .leftJoin('authentication', 'persons.authentication_id', 'authentication.authentication_id')
        .orderBy('persons.person_id', 'asc');
    } catch (err) {
      const error = new Error('Failed to fetch users.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async searchPersons(query) {
    try {
      return await knex('persons')
        .select(
          'persons.person_id',
          'persons.first_name',
          'persons.last_name',
          'persons.date_of_birth',
          'persons.phone_number',
          'persons.gender',
          'persons.street_address',
          'persons.city',
          'persons.state',
          'persons.postal_code',
          'authentication.authentication_id',
          'authentication.email',
          'authentication.role'
        )
        .leftJoin('authentication', 'persons.authentication_id', 'authentication.authentication_id')
        .where(function () {
          this.where('persons.first_name', 'ilike', `%${query}%`)
            .orWhere('persons.last_name', 'ilike', `%${query}%`);
        })
        .orderBy('persons.person_id', 'asc');
    } catch (err) {
      const error = new Error('Failed to search persons.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async getPersonById(person_id) {
    try {
      const person = await knex('persons')
        .select(
          'persons.person_id',
          'persons.first_name',
          'persons.last_name',
          'persons.date_of_birth',
          'persons.phone_number',
          'persons.gender',
          'persons.street_address',
          'persons.city',
          'persons.state',
          'persons.postal_code',
          'authentication.authentication_id',
          'authentication.email',
          'authentication.role'
        )
        .leftJoin('authentication', 'persons.authentication_id', 'authentication.authentication_id')
        .where('persons.person_id', person_id)
        .first();

      return person || null;
    } catch (err) {
      const error = new Error('Failed to fetch person.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async deletePerson(person_id) {
    try {
      const deleted = await knex('persons')
        .where('person_id', person_id)
        .del()
        .returning('*');

      return deleted[0];
    } catch (err) {
      const error = new Error('Failed to delete person.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async updatePerson(person_id, authentication_id, data) {
    try {
      return await knex.transaction(async (trx) => {
        await trx('persons')
          .where('person_id', person_id)
          .update({
            first_name: data.first_name,
            last_name: data.last_name,
            date_of_birth: data.date_of_birth,
            phone_number: data.phone_number,
            gender: data.gender,
            street_address: data.street_address,
            city: data.city,
            state: data.state,
            postal_code: data.postal_code
          });

        await trx('authentication')
          .where('authentication_id', authentication_id)
          .update({
            email: data.email,
            role: data.role
          });

        return await trx('persons')
          .select(
            'persons.person_id',
            'persons.first_name',
            'persons.last_name',
            'persons.date_of_birth',
            'persons.phone_number',
            'persons.gender',
            'persons.street_address',
            'persons.city',
            'persons.state',
            'persons.postal_code',
            'authentication.authentication_id',
            'authentication.email',
            'authentication.role'
          )
          .leftJoin('authentication', 'persons.authentication_id', 'authentication.authentication_id')
          .where('persons.person_id', person_id)
          .first();
      });
    } catch (err) {
      const error = new Error('Failed to update person.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };
};

module.exports = new PersonsDao();