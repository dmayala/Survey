import React from 'react';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static contextTypes = { 
      flux: React.PropTypes.object.isRequired,
      history: React.PropTypes.object.isRequired
    }

    state = this._getLoginState();

    _getLoginState() {
      let store = this.context.flux.getStore('login');
      let loginState = store.getState();
      
      return {
        user: loginState._user,
        jwt: loginState._jwt
      };
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentDidMount() {
      this.context.flux
                .getStore('login')
                .listen(this._onChange);
    }

    componentWillUnmount() {
      this.context.flux
                .getStore('login')
                .unlisten(this._onChange);
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          user={this.state.user}
          jwt={this.state.jwt}
        />
      );
    }
  }
};
