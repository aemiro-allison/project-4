const express = require('express');
const passport = require('passport');
const middlewares = require('./middlewares');

const authRoutes = express.Router();


// authenticate user
authRoutes.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  middlewares.handleAuthentication,
  middlewares.errorHandler,
);

// create user
authRoutes.post('/register', middlewares.handleRegister, middlewares.errorHandler);

// store token on client.
authRoutes.post('/login', middlewares.handleLogin, middlewares.errorHandler);

// removes token on client.
authRoutes.get('/logout', middlewares.handleLogout, middlewares.errorHandler);

module.exports = authRoutes;
