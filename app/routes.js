import React from 'react';
import { Route } from 'react-router';

import { isConnected } from 'utils/routesHooks';

import MainApp from 'components/MainApp';
import Home from 'components/Home';
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';

export default function (flux) {
  return (
    <Route component={MainApp}>
      <Route path="/" component={Home} />
      <Route path="dashboard" component={Dashboard} onEnter={ isConnected(flux) } />
      <Route path="login" component={Login} />
    </Route>
  );
}
