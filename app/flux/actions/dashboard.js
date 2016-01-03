const APIUtils = require(`../../../shared/API/Dashboard/${ process.env.BROWSER ? 'client' : 'server' }`)

class DashboardActions { 

  constructor() {
    this.generateActions(
      'addSurveySuccess',
      'addSurveyFail'
    );
  }

  addSurvey(details) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await APIUtils.addSurvey(details);
          this.actions.addSurveySuccess(details);
        } catch (error) {
          this.actions.addSurveyFail({ error });
        }
      });
  }
}

export default DashboardActions; 
