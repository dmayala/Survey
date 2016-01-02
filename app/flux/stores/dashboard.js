class SurveyStore {
  constructor() {
    this.bindActions(this.alt.getActions('dashboard'));
  }

  onAddSurveySuccess(survey) {
  }
}

export default SurveyStore;
