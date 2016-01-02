import React from 'react';
import AuthenticatedComponent from 'components/AuthenticatedComponent';
import {Input, Button} from 'react-bootstrap';

export default AuthenticatedComponent(class Dashboard extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired
  }

  state = {
    question: '',
    choices: [ null, null, null ]
  }

  _onChange = () => {
    this.setState({
      question: '',
      choices: [ null, null, null ]
    });
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

  render() {
    let choices = this.state.choices.map((choice, index) => {
      return (
        <Input key={index} label={`Choice ${index + 1}`} name="choices" type="text"
        onChange={e => this._onInputChange(e, index)} /> 
      ); 
    });

    return (
      <div className="container" id="content">
        <h2>Add a Survey</h2> 
        <form ref="addSurvey">
          <Input label="Question" name="question" type="text" value={this.state.username}
          onChange={this._onInputChange} /> 
          { choices }
        </form>
        <Button onClick={this._onSubmit}>Add Survey</Button>
      </div>
    );
  }
});
