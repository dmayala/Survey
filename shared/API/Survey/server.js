import db from 'models/';

export default {
  async getRandom(answered) {
    try {
      let survey = await db.Survey.getRandom();
      return survey.toJSON();
    } catch (err) {
      throw new Error(err);
    }
  }
}
