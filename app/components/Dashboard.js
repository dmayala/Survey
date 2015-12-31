import React from 'react';
import AuthenticatedComponent from 'components/AuthenticatedComponent';

export default AuthenticatedComponent(class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    question: '',
    choices: []
  }

  _onChange = () => {

  }

  render() {
    let choices = this.state.choices.map((choice, index) => {
      return (
        <Input label={ `Choice ${index}`} name="choice" type="password" value={choice}
          onChange={this._onChange} /> 
      ); 
    });

    return (
      <div className="container" id="content">
        <h2>Add a Survey</h2> 
        <form ref="addSurvey">
          <Input label="Question" name="question" type="text" value={this.state.username}
          onChange={this._onChange} /> 
        </form>
      </div>
    );
  }
});
