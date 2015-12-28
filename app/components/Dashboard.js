import React from 'react';
import AuthenticatedComponent from 'components/AuthenticatedComponent';

export default AuthenticatedComponent(class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = Object.assign({}, this.state, this.props);
    return (
      <div className="container" id="content">
        Dashboard is here
      </div>
    );
  }
});
