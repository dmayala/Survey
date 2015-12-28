import React from 'react';
import history from 'utils/routerHistory';
import createFlux from 'flux/createFlux';
import universalRender from '../shared/universalRender';

const flux = createFlux();

universalRender({ flux, history, container: document.getElementById('survey') })
  .catch(err => console.log(err));
