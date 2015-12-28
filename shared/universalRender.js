/* eslint react/display-name: 0 */

import Iso from 'iso';
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import Router, { RoutingContext, match } from 'react-router';
import AltContainer from 'alt-container';

const { BROWSER, NODE_ENV } = process.env;

const runRouter = (location, routes) => {
  return new Promise((resolve, reject) => {
    match({ routes, location }, (err, redirect, renderProps) => {
      if (typeof err === 'undefined' && 
          typeof redirect === 'undefined' &&
          typeof renderProps === 'undefined') {
        let e = new Error('No matching routes.');
        e.code = 404;
        return reject({ error: e, redirect, renderProps });
      }
      return resolve({ error: err, redirect, renderProps });
    });
  });
}

const bootstrap = () =>
  new Promise((resolve) =>
    Iso.bootstrap((initialState) =>
      resolve({ initialState })));

/* eslint space-before-function-paren:0 */
// https://github.com/eslint/eslint/issues/4442
export default async function({ flux, history, location, container }) {
  if (BROWSER) {
    if (NODE_ENV === 'development') require('alt-utils/lib/chromeDebug')(flux);

    const { initialState } = await bootstrap();
    flux.bootstrap(initialState);

    const routes = require('routes');

    const element = (
      <AltContainer history={ history } flux={ flux }>
        <Router
          flux={ flux }
          history={ history }
          routes={ routes(flux) } />
      </AltContainer>
    );

    render(element, container);

    // Tell `alt-resolver` we have done the first render
    // next promises will be resolved
    flux.resolver.firstRender = false;
  } else {
    const routes = require('routes')(flux);
    const { error, redirect, renderProps } = await runRouter(location, routes);

    if (error || redirect) throw ({ error, redirect });

    const element = (
      <AltContainer flux={ flux }>
        <RoutingContext { ...renderProps } />
      </AltContainer>
    );

    let app;
    let fluxSnapshot;
    try {
      // Collect promises with a first render
      console.log('first server render');
      renderToString(element);

      // Resolve them
      await flux.resolver.dispatchPendingActions();

      console.log('second server render');

      fluxSnapshot = flux.takeSnapshot();
      app = renderToString(element);
    } catch (renderErr) {
      // Catch rendering error, render a 500 page

      fluxSnapshot = flux.takeSnapshot();
      app = null;
    }

    // Get status code, page title and page description for rendering
    const { titleBase, title, ...helmet } = flux.getStore('helmet').getState();

    return { ...helmet, body: Iso.render(app, fluxSnapshot), title: titleBase + title };
  }
}
