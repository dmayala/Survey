import express from 'express';
import jwt_simple from 'jwt-simple';
import db from 'models/';

const router = express.Router();

// Return all surveys
router.get('/', async (req, res) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_simple.decode(token, process.env.JWT_SECRET);
      if (decoded.user === 'admin') {
        let surveys = await db.Survey.findAll({
          include: [{ 
            model: db.Choice, as: 'choices', 
            include: {
              model: db.Vote, as: 'votes',
              attributes: ['id']
            }
          }],
        });
        return res.send(surveys);
      }
    }
    return res.status(500).send({ 'error': 'An error has occurred' });
  } catch (err) {
    return next(err);
  }
});

// Return a random survey
router.get('/rand', async (req, res) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_simple.decode(token, process.env.JWT_SECRET);
      let { answered } = decoded;
      let survey = await db.Survey.getRandom(answered);

      if (survey) {
        return res.send(survey);
      }
    }
    return res.status(500).send({ 'error': 'An error has occurred' });
  } catch (err) {
    return next(err);
  }
});

// Create a new survey
router.post('/', async (req, res) => {

  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      let { question, choices } = req.body;
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_simple.decode(token, process.env.JWT_SECRET);

      if (decoded.user === 'admin') {
          let survey = await db.Survey.create({ question });

          choices = choices.map((text) => {
            return db.Choice.create({ text, SurveyId: survey.id });
          });

          await Promise.all(choices);
          
          let completeSurvey = await db.Survey.findOne({
            include: [ { model: db.Choice, as: 'choices' } ],
            where: { id: survey.id },
          });

          return res.send(completeSurvey);
      }
    }
  } catch (err) {
    return res.status(500).send({ 'error': 'An error has occurred' });
  }

  return res.status(500).send({ 'error': 'An error has occurred' });
});

// Pick a survey choice
router.post('/:surveyId/votes/:choiceId', async (req, res) => {
  let { surveyId, choiceId } = req.params;
  let token = jwt_simple.decode(req.body.guest, process.env.JWT_SECRET);
  let { guest, answered } = token;

  if (answered.indexOf(surveyId) === -1) {
    try {
      let vote = await db.Vote.create({ guest, ChoiceId: choiceId });
      answered.push(surveyId); 
      token = jwt_simple.encode({ guest, answered }, process.env.JWT_SECRET);
      return res.send({ token });
    } catch (err) {
      return next(err);
    }
  }
  res.status(500).send({ 'error': 'You have already answered this question.' });
});


module.exports = router;
