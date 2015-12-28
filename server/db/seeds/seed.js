import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

export default async (db) => {
  let survey = await db.Survey.create({
    question: 'What features would you like to see'
  });
  
  await db.Choice.bulkCreate([{
    id: 1,
    text: 'Improved UI',
    description: 'New, fancy interface',
    SurveyId: survey.id
  }, {
    id: 2,
    text: 'Improved Performance',
    description: 'Faster response times',
    SurveyId: survey.id
  }]);

  let user = await db.User.create({
    username: 'tigger',
    password: bcrypt.hashSync('tiger', salt)
  });

  return user;
};
