import React from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
  require('stylesheets/components/_Home');
}

class Home extends React.Component {

  render() {
    const props = Object.assign({}, this.state, this.props);
    return (
      <div className="container home-component">
        Home is here
      </div>
    );
  }
}

export default Home;
