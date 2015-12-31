import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, DropdownButton, MenuItem, NavItem} from 'react-bootstrap';

if (process.env.BROWSER) {
  require('stylesheets/components/_Header');
}

class Header extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
  }
  
  _onLogout = (e) => {
    e.preventDefault();
    this.context.flux.getActions('login').logoutUser();
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
            <NavItem eventKey={1} href="#">Log In</NavItem>
            <NavItem eventKey={1} href="#" onClick={ this._onLogout }>Log Out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
