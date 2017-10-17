const db = require('../config/db');

const Task = {};
const taskTable = 'tasks';

Task.all = () =>
  db.query(`SELECT * FROM ${taskTable}`);

Task.findAllByUser = id =>
  db.query(`
    SELECT * FROM tasks
    WHERE user_id = $1`, [id]);

Task.findOne = (field, value) =>
  db.one(`
    SELECT * FROM ${taskTable}
    WHERE ${field} = $1`, [value]);

Task.findOneByUser = (id, userId) =>
  db.one(`
    SELECT * FROM ${taskTable}
    WHERE id = $1 AND user_id = $2`, [id, userId]);


Task.create = task =>
  db.one(`
    INSERT INTO ${taskTable}
    (name, description, attributes, group_id, user_id)
    VALUES
    (
    $/name/,
    $/description/,
    $/attributes/,
    $/group_id/,
    $/user_id/
    )
    RETURNING *`, task);

Task.update = task =>
  db.one(`
    UPDATE ${taskTable}
    SET
    name = $/name/,
    description = $/description/,
    attributes = $/attributes/,
    group_id = $/group_id/
    WHERE
    id = $/id/ AND user_id = $/user_id/
    RETURNING *`, task);

Task.destroy = id =>
  db.none(`DELETE FROM ${taskTable} WHERE id = $1`, [id]);

module.exports = Task;
