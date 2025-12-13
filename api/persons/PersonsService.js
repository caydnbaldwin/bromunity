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

  async getPersons(session) {
    try {
      if (session.authentication?.role !== 'admin') {
        const error = new Error('You do not have permission to view this page.');
        error.status = 403;
        throw error;
      };
      return await personsDao.getPersons();
    } catch (error) {
      throw error;
    };
  };

  async searchPersons(session, query) {
    try {
      if (session.authentication?.role !== 'admin') {
        const error = new Error('You do not have permission to view this page.');
        error.status = 403;
        throw error;
      };

      const trimmedQuery = (query || '').trim();
      if (!trimmedQuery) {
        return await personsDao.getPersons();
      };

      return await personsDao.searchPersons(trimmedQuery);
    } catch (error) {
      throw error;
    };
  };

  async getEditPerson(session, personId) {
    try {
      if (session.authentication?.role !== 'admin') {
        const error = new Error('You do not have permission to view this page.');
        error.status = 403;
        throw error;
      };

      if (!personId) {
        const error = new Error('Person ID is required.');
        error.status = 400;
        throw error;
      };

      const person = await personsDao.getPersonById(personId);
      if (!person) {
        const error = new Error('Person not found.');
        error.status = 404;
        throw error;
      };

      return person;
    } catch (error) {
      throw error;
    };
  };

  async updatePerson(session, personId, formData) {
    try {
      if (session.authentication?.role !== 'admin') {
        const error = new Error('You do not have permission to perform this action.');
        error.status = 403;
        throw error;
      };

      if (!personId) {
        const error = new Error('Person ID is required.');
        error.status = 400;
        throw error;
      };

      const existingPerson = await personsDao.getPersonById(personId);
      if (!existingPerson) {
        const error = new Error('Person not found.');
        error.status = 404;
        throw error;
      };

      const first_name = formData.first_name?.trim();
      const last_name = formData.last_name?.trim();
      const email = formData.email?.trim();
      const role = formData.role?.trim().toLowerCase();

      if (!first_name) {
        const error = new Error('First name is required.');
        error.status = 400;
        throw error;
      };

      if (!last_name) {
        const error = new Error('Last name is required.');
        error.status = 400;
        throw error;
      };

      if (!email) {
        const error = new Error('Email is required.');
        error.status = 400;
        throw error;
      };

      const allowedRoles = ['admin', 'user'];
      const normalizedRole = allowedRoles.includes(role) ? role : 'user';

      const updatePayload = {
        first_name,
        last_name,
        email,
        role: normalizedRole,
        phone_number: formData.phone_number?.trim() || null,
        date_of_birth: formData.date_of_birth?.trim() ? formData.date_of_birth.trim() : null,
        gender: formData.gender?.trim() || null,
        street_address: formData.street_address?.trim() || null,
        city: formData.city?.trim() || null,
        state: formData.state?.trim() || null,
        postal_code: formData.postal_code?.trim() || null
      };

      return await personsDao.updatePerson(personId, existingPerson.authentication_id, updatePayload);
    } catch (error) {
      throw error;
    };
  };

  async deletePerson(session, personId) {
    try {
      if (session.authentication?.role !== 'admin') {
        const error = new Error('You do not have permission to perform this action.');
        error.status = 403;
        throw error;
      };

      if (!personId) {
        const error = new Error('Person ID is required.');
        error.status = 400;
        throw error;
      };

      const deleted = await personsDao.deletePerson(personId);
      if (!deleted) {
        const error = new Error('Person not found.');
        error.status = 404;
        throw error;
      };
      return deleted;
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new PersonsService();