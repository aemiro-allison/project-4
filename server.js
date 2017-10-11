require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task-routes');
const groupRoutes = require('./routes/group-routes');
// const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'home route/page.',
  });
});

app.use('/tasks', taskRoutes);
app.use('/groups', groupRoutes);

app.use('*', (req, res) => {
  res.json({
    message: 'Page Not Found',
  });
}, (err, req, res, next) => {
  res.json({
    err,
    message: 'Oops, an error occured.',
  });
});

app.listen(PORT, () => {
  console.log(`
    Server listening on port ${PORT}
    in ${app.get('env')} environment.
  `);
});
