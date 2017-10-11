require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task-routes');
const groupRoutes = require('./routes/group-routes');
const authRoutes = require('./auth/routes');
const passport = require('passport');
const jwt = require('./auth/jwt');
const { errorHandler } = require('./auth/middlewares');

const app = express();
const PORT = process.env.PORT || 3001;

passport.use(jwt);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.json({
    message: 'home route/page.',
  });
});


app.use('/tasks', taskRoutes);
app.use('/groups', groupRoutes);
app.use('/auth', authRoutes);

app.use('*', (req, res) => {
  res.json({
    message: 'Page Not Found',
  });
}, errorHandler);


app.listen(PORT, () => {
  console.log(`
    Server listening on port ${PORT}
    in ${app.get('env')} environment.
  `);
});
