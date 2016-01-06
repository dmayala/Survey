import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

export default async (db) => {
  let firstSurvey = await db.Survey.create({
    question: 'What features would you like to see?'
  });

  let secondSurvey = await db.Survey.create({
    question: 'How are you?'
  });

  let thirdSurvey = await db.Survey.create({
    question: 'Pick a color'
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
    text: 'Improved Questions',
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
  },{
    id: 7,
    text: 'Red',
    SurveyId: thirdSurvey.id
  },{
    id: 8,
    text: 'Yellow',
    SurveyId: thirdSurvey.id
  },{
    id: 9,
    text: 'Green',
    SurveyId: thirdSurvey.id
  },{
    id: 10,
    text: 'Blue',
    SurveyId: thirdSurvey.id
  }
  ]);

  let user = await db.User.create({
    username: 'admin',
    password: bcrypt.hashSync('root', salt)
  });

  return user;
};
