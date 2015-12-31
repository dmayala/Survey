import React from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
  require('stylesheets/components/_Footer');
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="container footer-component">
        <p className="pull-right"><Link to="/">Back Home</Link></p>

        <p>Built as a sample application with <a href=
        "https://facebook.github.io/react/">React</a>, <a href=
        "http://nodejs.org/">Node.js</a>, <a href=
        "http://expressjs.com/">Express</a>, and <a href=
        "https://www.mysql.com/">MySQL</a> by <a href="https://www.github.com/dmayala"
        target="_blank">@dmayala</a>.<br />
        The source code for this application is available in <a href="https://github.com/dmayala/survey" target="_blank">this
        repository</a> on GitHub.</p>
      </footer>
    );
  }
}

export default Footer;
