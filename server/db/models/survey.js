import Sequelize from 'sequelize';
import Promise from 'bluebird';

export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    guest: DataTypes.STRING
  }, 
  {
    classMethods: {
      associate(models) {},

      findCount(choiceId) {
        return Vote.count({ 
          where: { 'ChoiceId': choiceId }
        });
      }
    }
  });

  const Choice = sequelize.define('Choice', {
    text: DataTypes.STRING,
    description: DataTypes.STRING
  }, 
  {
    classMethods: {
      associate(models) {
        Choice.hasMany(models.Vote, { as : 'votes' });
      }
    }
  });

  const Survey = sequelize.define('Survey', {
    question: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Survey.hasMany(models.Choice, { as: 'choices' });
      },

      getRandom(answered = []) {
        answered = answered.length > 0 ? answered : 0;
        return Survey.findOne({
          include: [ { model: Choice, as: 'choices' } ],
          order: [ [ Sequelize.fn('rand') ] ],
          where: {
            id: {
              not: answered 
            }
          }
        });
      }
    }
  });

  return [ Vote, Choice, Survey ];
}

