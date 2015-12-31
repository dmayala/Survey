import cookie from 'react-cookie';
const APIUtils = require(`../../../shared/API/Survey/${ process.env.BROWSER ? 'client' : 'server' }`)

class SurveyActions { 

  constructor() {
    this.generateActions(
      'getRandomSuccess',
      'getRandomFail',
      'voteSuccess',
      'voteFail'
    );
  }

  getRandom(answered) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await APIUtils.getRandom(answered);
          this.actions.getRandomSuccess(response);
        } catch (error) {
          this.actions.getRandomFail({ error });
        }
      });
  }

  vote(surveyId, choiceId) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await APIUtils.vote(surveyId, choiceId);
          if (response.token) {
            cookie.save('guest', response.token);
            alt.getActions('login').loadGuest(response);
            this.actions.voteSuccess(response);
          }
        } catch (error) {
          this.actions.voteFail({ error });
        }
      });
  }
}

export default SurveyActions; 
