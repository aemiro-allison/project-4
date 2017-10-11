const passportJWT = require('passport-jwt');
const User = require('../models/user');
const authConfig = require('./config');

const { ExtractJwt, Strategy } = passportJWT;

const options = {};

options.secretOrKey = authConfig.secret;
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.jsonWebTokenOptions = {
  maxAge: '1hr',
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  const { user_id, email, username } = payload;

  return User.findOne('id', user_id)
    .then((user) => {
      if (!user) return done(null, false);

      return done(null, {
        user_id,
        email,
        username,
      });
    })
    .catch(err => done(err));
});

module.exports = jwtStrategy;
