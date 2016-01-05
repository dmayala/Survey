import db from 'models/';

export default {
  async getSurveys() {
    try {
      let surveys = await db.Survey.findAll({
        include: [{ 
          model: db.Choice, as: 'choices', 
          include: {
            model: db.Vote, as: 'votes',
            attributes: ['id']
          }
        }],
      });
      return surveys;
    } catch (err) {
      throw new Error(err);
    }
  }
}
