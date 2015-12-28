require('dotenv').load();
require('babel/register')({ stage: 0 });
// Delete the `BROWSER` env variable if it's present
// https://github.com/iam4x/isomorphic-flux-boilerplate/issues/16
delete process.env.BROWSER;

// Tell `require` calls to look into `/app` also
// it will avoid `../../../../../` require strings
const modulePath = require('app-module-path');
modulePath.addPath(__dirname + '/../app');
modulePath.addPath(__dirname + '/../shared');
modulePath.addPath(__dirname + '/db');

// Start the server
require('./server.js');

