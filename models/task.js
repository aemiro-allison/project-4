const db = require('../config/db');

const Task = {};
const taskTable = 'tasks';

Task.all = () =>
  db.query(`SELECT * FROM ${taskTable}`);

Task.findOne = (field, value) =>
  db.one(`
    SELECT * FROM ${taskTable}
    WHERE ${field} = $1`, [value]);

Task.create = task =>
  db.one(`
    INSERT INTO ${taskTable}
    (priority_lvl, estimated_time, attributes, group_id)
    VALUES
    (
    $/priority_lvl/,
    $/estimated_time/,
    $/attributes/,
    $/group_id/
    )
    RETURNING *`, task);

Task.update = task =>
  db.one(`
    UPDATE ${taskTable}
    SET
    priority_lvl = $/priority_lvl/,
    estimated_time = $/estimated_time/,
    attributes = $/attributes/,
    group_id = $/group_id/
    WHERE
    id = $/id/
    RETURNING *`, task);

Task.destroy = id =>
  db.none(`DELETE FROM ${taskTable} WHERE id = $1`, [id]);

module.exports = Task;
