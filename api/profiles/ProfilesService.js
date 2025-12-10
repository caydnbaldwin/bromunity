const profilesDao = require('./ProfilesDao');

class ProfilesService {
  async getProfilePage(session) {
    try {
      const person_id = session.person.person_id;
      const profiles = await profilesDao.getProfilePage(person_id);
      if (profiles) {
        return profiles;
      } else {
        throw new Error('Failed get profiles.');
      };
    } catch (error) {
      throw error;
    };
  };

  async getAddProfilePage() {
    try {
      const games = await profilesDao.getAddProfilePage();
      if (games) {
        return games;
      } else {
        throw new Error('Failed to get games.');
      };
    } catch (error) {
      throw error;
    };
  };

  async postAddProfile(session, formData) {
    try {
      const person_id = session.person.person_id;
      const {game_id, gaming_platform, description, hours_of_gameplay} = formData;
      const profile = await profilesDao.postAddProfile(person_id, game_id, gaming_platform, description, hours_of_gameplay);
      if (profile) {
        return profile[0];
      } else {
        throw new Error('Failed to create profile.');
      };
    } catch (error) {
      throw error;
    };
  };

  async postEditProfile(session, formData) {
    try {
      const person_id = session.person.person_id;
      const {game_id, gaming_platform, description, hours_of_gameplay} = formData;
      const profile = await profilesDao.postEditProfile(person_id, game_id, gaming_platform, description, hours_of_gameplay);
      if (profile) {
        return profile[0];
      } else {
        throw new Error('Failed to update profile.');
      };
    } catch (error) {
      throw error;
    };
  };

  async deleteProfile(urlParameters) {
    try {
      const {person_id, game_id} = urlParameters;
      const profile = await profilesDao.deleteProfile(person_id, game_id);
      if (profile) {
        return profile[0];
      } else {
        throw new Error('Failed to delete profile.');
      };
    } catch (error) {
      throw error;
    };
  };
};

module.exports = new ProfilesService();