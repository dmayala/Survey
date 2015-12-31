import React from 'react';
import {Input, Button} from 'react-bootstrap';

class Login extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired
  }

  state = {
    username: '',
    password: ''
  };

  _onLogin = (e) => {
    e.preventDefault();
    this.context.flux.getActions('login').loginUser(this.state);
  }

  _onChange = (e) => {
    let state = Object.assign({}, this.state);
    state[e.target.name] = e.target.value; 
    this.setState(state);
  }


  render() {
    return (
      <div className="container">
        <h2>Log In</h2>
        <form ref="loginForm">
          <Input label="Username" name="username" type="text" value={this.state.username}
          onChange={this._onChange} /> 
          <Input label="Password" name="password" type="password" value={this.state.password}
          onChange={this._onChange} /> 
        </form>
        <Button onClick={this._onLogin}>Login</Button>
      </div>
    );
  }
}

export default Login;
