import React from 'react';
import {Button} from 'react-bootstrap';
import {sortBy} from 'lodash';

class Survey extends React.Component {
  
  static contextTypes = {
    flux: React.PropTypes.object.isRequired
  }

  state = this.getState();

  getState() {
    return this.context.flux.getStore('survey')
                            .getState();
  }

  componentWillMount() {
    this.context.flux.getActions('survey')
                     .getRandom();
  }

  componentDidMount() {
    this.context.flux.getStore('survey')
                     .listen(this._onChange);
  }

  componentWillUnmount() {
    var store = this.context.flux.getStore('survey');
    store.unlisten(this._onChange);
    this.context.flux.recycle(store);
  }

  _onChange = () => {
    this.setState(this.getState());
  }

  _onVote = (choiceId) => {
    this.context.flux.getActions('survey')
                     .vote(this.state.id, choiceId);
  }

  render() {
    let { id, question, choices } = this.state;
    
    choices = sortBy(choices, 'id').map((choice) => {
      return (
        <Button key={choice.id} onClick={ this._onVote.bind(this, choice.id) } bsStyle="primary" bsSize="large" block>{ choice.text }</Button>
      );
    });

    return (
      <div className="container survey-component">
        <h2 className="text-center">
          { question }
        </h2>
        <div className="well">
          { choices }
        </div>
      </div>
    );
  }
}

export default Survey;
