const personsDao = require('./PersonsDao');

class PersonsService {
  async getOnboardingPage(session) {
    try {
      const person = await personsDao.getOnboardingPage(session.authentication.authentication_id);
      return person[0];
    } catch (error) {
      throw error;
    };
  };

  async postOnboarding(session, formData) {
    try {
      const authentication_id = session.authentication.authentication_id;
      const {first_name, last_name, date_of_birth, phone_number, gender, street_address, city, state, postal_code} = formData;
      const person = await personsDao.postOnboarding(first_name, last_name, date_of_birth, phone_number, gender, street_address, city, state, postal_code, authentication_id);
      if (person[0]) {
        return person[0];
      } else {
        throw new Error('Onboarding failed.');
      };
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new PersonsService();