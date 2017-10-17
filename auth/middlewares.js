const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('./config');
const Pass = require('./pass');


module.exports.handleAuthentication = (req, res) => {
  res.json({
    message: 'user is logged in.',
    user: {
      user_id: req.user.user_id,
      username: req.user.username,
      email: req.user.email,
    },
  });
};

module.exports.handleRegister = (req, res, next) => {
  const { password, username, email } = req.body;

  if (username && password) {
    User.findOne('username', username)
      .then((doesUserAlreadyExist) => {
        if (doesUserAlreadyExist) {
          next({ name: 'UserAlreadyExist' });
          return;
        }

        Pass.createPass(password)
          .then(hashedPassword =>
            User.create({
              username,
              email,
              password: hashedPassword,
            }))
          .then((user) => {
            res.json({
              message: 'user successfully created.',
              user: {
                user_id: user.id,
                username: user.username,
                email: user.email,
              },
            });
          })
          .catch(next);
      })
      .catch(next);
  } else {
    next({ name: 'InvalidUsernameOrPassword' });
  }
};

module.exports.handleLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    User.findOne('username', username)
      .then((user) => {
        if (!user) {
          next({ name: 'UserNotFound' });
          return;
        }

        Pass.comparePass(password, user.password)
          .then((doesPassMatch) => {
            if (!doesPassMatch) {
              next({ name: 'InvalidPassword' });
              return;
            }

            const payload = {
              user_id: user.id,
              email: user.email,
              username: user.username,
            };

            const token = jwt.sign(payload, authConfig.secret);

            res.json({ message: 'ok', token });
          })
          .catch(next);
      })
      .catch(next);
  } else {
    next({ name: 'InvalidUsernameOrPassword' });
  }
};

module.exports.handleLogout = (req, res) => {
  res.json({ action: 'logout' });
};

module.exports.errorHandler = (err, req, res, next) => {
  // console.log(err.name);
  // console.error(err);

  // return a error message based on the encountered error.
  const message = ({
    'QueryResultError':    'mutliple users with that username. Contact devs to resolve issue',
    'MismatchError':       'Invalid Password',
    'UserNotFound':        'User not found',
    'UserAlreadyExist':    'User already exist. Please enter a different username.',
    'SyntaxError':         err.message,
    'InvalidUsernameOrPassword': 'Invalid username or password entered.',
    'error': `Contact devs to resolve issue: ${err.message}`,
  })[err.name] || 'Oops, something went wrong!';

  res.json({ message, err });
};
