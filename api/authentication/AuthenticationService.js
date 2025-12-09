const authenticationDao = require('./AuthenticationDao');
const bcrypt = require('bcrypt');

class AuthenticationService {
  async postSignup(formData) {
    try {
      const {email, password} = formData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const authentication = await authenticationDao.postSignup(email, hashedPassword);
      if (authentication[0]) {
        return authentication[0];
      } else {
        throw new Error('Sign up failed.');
      };
    } catch (error) {
      throw error;
    };
  };

  async postLogin(formData) {
    try {
      const {email, password} = formData;
      const authentication = await authenticationDao.postLogin(email);
      if (authentication[0]) {
        if (await bcrypt.compare(password, authentication[0].password)) {
          return authentication[0];
        } else {
          throw new Error('Login failed.');
        };
      } else {
        throw new Error('Login failed.');
      };
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new AuthenticationService();