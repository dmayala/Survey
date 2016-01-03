class DashboardStore {
  constructor() {
    this.bindActions(this.alt.getActions('dashboard'));
    this.survey = {};
  }

  onAddSurveySuccess(survey) {
    this.survey = survey;
  }
}

export default DashboardStore;
