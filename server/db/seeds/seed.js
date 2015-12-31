import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

export default async (db) => {
  let firstSurvey = await db.Survey.create({
    question: 'What features would you like to see?'
  });

  let secondSurvey = await db.Survey.create({
    question: 'How are you?'
  });
  
  await db.Choice.bulkCreate([{
    id: 1,
    text: 'Improved UI',
    SurveyId: firstSurvey.id
  }, {
    id: 2,
    text: 'Improved Performance',
    SurveyId: firstSurvey.id
  },{
    id: 3,
    text: 'Improved Security',
    SurveyId: firstSurvey.id
  },{
    id: 4,
    text: 'Great',
    SurveyId: secondSurvey.id
  },{
    id: 5,
    text: 'Fine',
    SurveyId: secondSurvey.id
  },{
    id: 6,
    text: 'Terrible',
    SurveyId: secondSurvey.id
  }
  ]);

  let user = await db.User.create({
    username: 'tigger',
    password: bcrypt.hashSync('tiger', salt)
  });

  return user;
};
