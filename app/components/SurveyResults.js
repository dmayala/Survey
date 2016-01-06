import React from 'react';
import AuthenticatedComponent from 'components/AuthenticatedComponent';
import {Input, Button, Glyphicon, Alert, Accordion, Panel} from 'react-bootstrap';
import {sortBy} from 'lodash';

export default AuthenticatedComponent(class SurveyResults extends React.Component {

  static propTypes = { children: React.PropTypes.element }
  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

  state = this._getResultsState();

  _getResultsState() {
    let store = this.context.flux.getStore('surveyResults');
    let surveyResultState = store.getState();

    return {
      surveys: surveyResultState.surveys,
      searchTerm: '' 
    };
  }

  componentWillMount() {
    this.context.flux.getActions('surveyResults')
                     .getSurveys();
  }

  componentDidMount() {
    this.context.flux.getStore('surveyResults')
                     .listen(this._onChange);
  }

  componentWillUnmount() {
    this.context.flux.getStore('surveyResults')
                     .unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState(this._getResultsState());
  }

  _handleSearch = () => {
    let state = Object.assign({}, this.state);
    state.searchTerm = this.refs.resultSearch.getValue().toLowerCase();
    this.setState(state);
  }

  render() {
    let surveys = this.state.surveys.filter((survey) => {
      return survey.question.toLowerCase().indexOf(this.state.searchTerm) !== -1;
    }).map(survey => {
      let choices = sortBy(survey.choices, 'id').map((choice, index) => {
      return (
        <li key={index}>{choice.text} - {choice.votes.length}</li>
      ); 
    });

      return (
        <Panel href="#" key={survey.id} eventKey={survey.id} header={survey.question}>
          <ul>
            { choices }
          </ul>
        </Panel>
      ); 
    });

    return (
      <div className="container" id="results">
        <h2>Results</h2>       
          <Input ref="resultSearch" onChange={this._handleSearch}name="search" type="text" placeholder="Search for surveys" /> 
          <Accordion>
            { surveys }
          </Accordion>
      </div>
    );
  }
});
