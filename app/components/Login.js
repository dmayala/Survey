import React from 'react';

class Login extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

  state = {
    username: '',
    password: ''
  };

  _onLogin = (e) => {
    e.preventDefault();
    this.context.flux.getActions('login').loginUser(this.state);
    window.history = this.context.history;
  }

  _onChange = (e) => {
    let state = Object.assign({}, this.state);
    state[e.target.name] = e.target.value; 
    this.setState(state);
  }


  render() {
    return (
      <div>
        <form ref="loginForm">
          <input label="Username" name="username" type="text" value={this.state.username}
          onChange={this._onChange} /> 
          <input label="Password" name="password" type="password" value={this.state.password}
          onChange={this._onChange} /> 
        </form>
        <button onClick={this._onLogin}>Login</button>
      </div>
    );
  }
}

export default Login;
