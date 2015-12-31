class SurveyStore {
  constructor() {
    this.bindActions(this.alt.getActions('survey'));
    this.id = null;
    this.question = '';
    this.choices = [];
  }

  onGetRandomSuccess(survey) {
    this.id = survey.id;
    this.question = survey.question;
    this.choices = survey.choices;
  }
}

export default SurveyStore;
