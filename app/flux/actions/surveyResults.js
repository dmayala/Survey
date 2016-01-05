const APIUtils = require(`../../../shared/API/SurveyResults/${ process.env.BROWSER ? 'client' : 'server' }`)

export default class SurveyResultsActions { 

  constructor() {
    this.generateActions(
      'getSurveysSuccess',
      'getSurveysFail'
    );
  }

  getSurveys() {
    return (dispatch, alt) => 
      alt.resolve(async () => {
        try {
          const response = await APIUtils.getSurveys();
          this.actions.getSurveysSuccess(response);
        } catch (error) {
          this.actions.getSurveysFail({ error });
        }
      });
  }
}

