import Sequelize from 'sequelize';
import Promise from 'bluebird';

export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    ip: DataTypes.STRING
  }, 
  {
    classMethods: {
      associate(models) {},

      addVote(ip, choice) {
        let promise = new Promise();
        Survey.findAll({ 
          where: Sequelize.and({ 'choices.id': choice }, { id: {
              in: Sequelize.literal('select "Choices"."SurveyId" from "Votes", "Choices" where "Votes"."ChoiceId" = "Choices"."id" and "Votes"."ip" = \'' + ip + '\'')
            } 
          }),
          
          include: [ {
            model: Choice, as: 'choices',
            include: [ { model: Vote, as: 'votes' } ]
          }]

        }).then((votes) => {
          Vote.create({
            ip: ip,
            ChoiceId: choice
          }).then((vote) => {
            promise.resolve(vote);
          });
        });

        return promise;
      },

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
      }
    }
  });

  return [ Vote, Choice, Survey ];
}

