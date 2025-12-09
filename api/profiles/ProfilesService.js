const profilesDao = require('./ProfilesDao');

class ProfilesService {
  async getProfilePage(session) {
    try {
      const person_id = session.person.person_id;
      return await profilesDao.getProfilePage(person_id);
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new ProfilesService();