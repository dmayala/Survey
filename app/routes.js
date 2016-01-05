import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { isConnected } from 'utils/routesHooks';

import MainApp from 'components/MainApp';
import Survey from 'components/Survey';
import AddSurvey from 'components/AddSurvey';
import SurveyResults from 'components/SurveyResults';
import Login from 'components/Login';

export default function (flux) {
  return (
    <Route component={MainApp}>
      <Route path="/" component={Survey} />
      <Route path="dashboard" onEnter={ isConnected(flux) }>
        <IndexRoute component={AddSurvey} />
        <Route path="results" component={SurveyResults} />
      </Route>
      <Route path="survey" component={Survey} />
      <Route path="results" component={SurveyResults} />
      <Route path="login" component={Login} />
    </Route>
  );
}
