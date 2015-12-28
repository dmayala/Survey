import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import {RouteHandler} from 'react-router';

if (process.env.BROWSER) {
  require('stylesheets/app');
}

class MainApp extends React.Component {
  static propTypes = { children: React.PropTypes.element }
  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <hr />
        { children }
        <hr />
        <Footer />
      </div>
    );
  }
}

export default MainApp;
