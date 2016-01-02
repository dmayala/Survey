import db from 'models/';

export default {
  async getRandom(answered) {
    answered = answered.length > 0 ? answered : 0;
    try {
      let survey = await db.Survey.findOne({
        include: [ { model: db.Choice, as: 'choices' } ],
        order: [ [ db.Sequelize.fn('rand') ] ],
        where: {
          id: {
            not: answered 
          }
        }
      });
      return survey.toJSON();
    } catch (err) {
      throw new Error(err);
    }
  }
}
