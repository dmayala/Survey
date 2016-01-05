import React from 'react';
import AuthenticatedComponent from 'components/AuthenticatedComponent';
import {Input, Button, Glyphicon, Alert} from 'react-bootstrap';

let getClearState = () => {
  return {
    question: '',
    choices: [ null, null, null ],
    success: null
  }
};

export default AuthenticatedComponent(class AddSurvey extends React.Component {

  static propTypes = { children: React.PropTypes.element }
  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

  state = getClearState(); 

  _onChange = () => {
    this.refs.addSurvey.reset();
    let state = getClearState();
    state.success = true;
    this.setState(state);
  }

  componentDidMount() {
    this.context.flux.getStore('dashboard')
                     .listen(this._onChange);
  }

  componentWillUnmount() {
    this.context.flux.getStore('dashboard')
                     .unlisten(this._onChange);
  }

  _onInputChange = (e, index) => {
    let state = Object.assign({}, this.state);
    if (e.target.name === 'choices') {
      state[e.target.name][index] = e.target.value
    } else {
      state[e.target.name] = e.target.value; 
    }
    this.setState(state);
  }

  _onSubmit = (e) => {
    e.preventDefault();
    this.context.flux.getActions('dashboard').addSurvey(this.state);
  }

  _addChoice = (e) => {
    e.preventDefault();
    let state = Object.assign({}, this.state);
    state.choices.push(null);
    this.setState(state);
  }

  _removeChoice = (index) => {
    let state = Object.assign({}, this.state);
    state.choices.splice(index, 1);
    this.setState(state);
  }

  render() {
    let choices = this.state.choices.map((choice, index) => {
      return (
        <Input key={index} value={ choice } name="choices" type="text" placeholder="Enter a choice"
        onChange={e => this._onInputChange(e, index)} buttonAfter={(
          <Button bsStyle="danger" onClick={this._removeChoice.bind(this, index)}>
            <Glyphicon glyph="minus" />
          </Button>
        )}/> 
      ); 
    });

    return (
      <div className="container" id="dashboard">

        { this.state.success ? (
          <Alert bsStyle="success">
            <strong>Success!</strong> A new survey has been added.
          </Alert>
          ) : null}

        <form ref="addSurvey">
          <h2>Add a New Survey</h2> 
          <Input name="question" type="text" placeholder="Enter a question" value={this.state.username}
          onChange={this._onInputChange} /> 
          <hr />
          <h2>Choices</h2>
          <Button bsStyle="default" onClick={this._addChoice} style={{ margin: '10px 0' }}>
            <Glyphicon glyph="plus" />
            &nbsp;Add a Choice
          </Button>
          <div style={{ color: 'red', display: this.state.choices.length < 2 ? 'inline' : 'none' }}> 2 or more choices required</div>
          { choices }
        </form>
        <hr />
        <Button bsStyle="primary" onClick={this._onSubmit} disabled={this.state.choices.length < 2}>
          <Glyphicon glyph="save" />
          &nbsp;Save New Survey
        </Button>
      </div>
    );
  }
});

