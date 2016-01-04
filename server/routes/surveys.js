import express from 'express';
import db from 'models/';

const router = express.Router();

// Return all surveys
router.get('/', async (req, res) => {
  try {
    let surveys = await db.Survey.findAll();
    return res.send({ surveys });
  } catch (err) {
    return next(err);
  }
});

// Return a random survey
router.get('/rand', async (req, res) => {
  try {
    let survey = await db.Survey.getRandom();
    return res.send(survey);
  } catch (err) {
    return next(err);
  }
});

// Create a new survey
router.post('/', async (req, res) => {
  let { question, choices } = req.body;

  try {
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
  } catch (err) {
    console.log(err);
    return res.status(500).send({ 'error': 'An error has occurred' });
  }

  return res.status(500).send({ 'error': 'An error has occurred' });
});

// Pick a survey choice
router.post('/:surveyId/votes/:choiceId', async (req, res) => {
  let { surveyId, choiceId } = req.params;
  let token = jwt_decode(req.body.guest);
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
