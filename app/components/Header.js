import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, DropdownButton, MenuItem, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

if (process.env.BROWSER) {
  require('stylesheets/components/_Header');
}

class Header extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
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

  _onChange = () => {
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
  
  _onLogout = (e) => {
    e.preventDefault();
    this.context.flux.getActions('login').logoutUser();
  }

  _adminNav = () => {
      return [
        (<LinkContainer key={1} to="dashboard">
          <NavItem eventKey={1}>Add Survey</NavItem>
        </LinkContainer>),
        (<LinkContainer key={2} to="results">
          <NavItem eventKey={2}>View Results</NavItem>
        </LinkContainer>),
        (<NavItem key={3} eventKey={3} onClick={this._onLogout}>Log Out</NavItem>),
      ];
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Survey</Link> 
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse eventKey={0}>
          <Nav navbar>
          </Nav>
          <Nav navbar pullRight>
           { !this.state.user ? 
              <NavItem eventKey={1} href="dashboard">Log In</NavItem> :
              this._adminNav()
           }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
