import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import jwt_simple from 'jwt-simple';
import db from 'models/';

import surveyRoutes from './routes/surveys';

const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

import React from 'react';
import reactCookie from 'react-cookie';
import createFlux from 'flux/createFlux';
import universalRender from '../shared/universalRender';

const app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// JWT setup
app.set('jwtTokenSecret', process.env.JWT_SECRET);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/api/surveys', surveyRoutes);

app.get('/guest', async (req, res) => {
  let token = jwt_simple.encode({ guest: require('uuid').v4(), answered: [] }, process.env.JWT_SECRET);
  return res.send({ token });
});

app.post('/login', async (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();

  let user = await db.User.findOne({ where: { username } });
  if (user) {
    let check = await bcrypt.compareAsync(password, user.get('password'));

    if (check) {
      let token = jwt_simple.encode({ user: user.get('username') }, process.env.JWT_SECRET);
      return res.send({ token });
    }
  }

  res.status(500).send({ 'error': 'This username or password is incorrect.' });
});

// react router config
app.use(async (req, res, next) => {

  const flux = createFlux();

  let  { jwt, guest } = req.cookies;

  if (jwt) {
    flux.getActions('login').loadUser({ token: jwt });
  } 
  
  if (guest) {
    flux.getActions('login').loadGuest({ token: guest });
  } else {
    let token = jwt_simple.encode({ guest: require('uuid').v4(), answered: [] }, process.env.JWT_SECRET);
    flux.getActions('login').loadGuest({ token });
    res.cookie('guest', token);
  }
  
  await flux.resolver.dispatchPendingActions();

  try {
    reactCookie.plugToRequest(req, res);
    const { body, title, statusCode, description } = await universalRender({ flux, location: req.url });
    return res.render('index', { html: body });
  } catch (err) {
    const { error, redirect } = err;
    
    if (error && error.code === 404) {
      return next();
    }

    if (redirect) {
      const { pathname, search } = redirect;
      return res.redirect(pathname + search);
    }

    return next(error);
  }

});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const server = require('http').createServer(app);
db.sequelize
  .sync()
  .then(async (obj) => {
    let survey = await db.Survey.findOne();
    if (!survey) {
      await require('seeds/seed')(db);
    }
    server.listen(app.get('port'), () => {
      if (process.send) {
        process.send('online');
      } 
      console.log(`Express server listening on port ${app.get('port')}`);
    });
  })
  .catch((reason) => {
    console.log(reason);
  });


