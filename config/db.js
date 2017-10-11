const pgp = require('pg-promise')();

module.exports = pgp(process.env.DATABASE_URL || {
  host: 'localhost',
  port: 5432,
  database: 'on_track',
});
