export default class SurveyResultsStore {
  constructor() {
    this.bindActions(this.alt.getActions('surveyResults'));
    this.surveys = [];
  }

  onGetSurveysSuccess(surveys) {
    this.surveys = surveys;
  }
}
