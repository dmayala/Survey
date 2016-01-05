import React from 'react';
import AuthenticatedComponent from 'components/AuthenticatedComponent';

export default AuthenticatedComponent(class Dashboard extends React.Component {

  static propTypes = { children: React.PropTypes.element }
  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props;
    return (
      <div className="container" id="dashboard">
        { children }
      </div>
    );
  }
});
