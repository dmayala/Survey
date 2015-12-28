import React from 'react';


if (process.env.BROWSER) {
  require('stylesheets/components/_Header');
}

class Header extends React.Component {

  render() {
    const props = Object.assign({}, this.state, this.props);
    return (
        <div>Header</div>
    );
  }
}

export default Header;
