const db = require('../config/db');

const User = {};

User.findOne = (field, id) =>
  db.oneOrNone(`SELECT * FROM users WHERE ${field} = $1`, [id]);

User.create = ({ username, email, password }) =>
  db.one(`
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`, [username, email, password]);

module.exports = User;
