const knex = require('../../utilities/database');

class AuthenticationDao {
  async postSignup(email, password) {
    try {
      return await knex('authentication')
        .insert({
          email,
          password
        })
        .returning('*');
    } catch (err) {
      const error = new Error('Sign up failed.');
      error.status = 409;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };

  async postLogin(email) {
    try {
      return await knex
        .select('*')
        .from('authentication')
        .where('email', email)
    } catch (err) {
      const error = new Error('Login failed.');
      error.status = 403;
      error.cause = err ? err : 'Error';
      throw error;
    };
  };
};

module.exports = new AuthenticationDao();