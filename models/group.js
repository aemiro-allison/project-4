const db = require('../config/db');

const Group = {};
const groupTable = 'groups';

Group.all = () =>
  db.query(`SELECT * FROM ${groupTable}`);

Group.findAllByUser = id =>
  db.query(`
    SELECT * FROM ${groupTable}
    WHERE user_id = $1`, [id]);

Group.findOne = (field, value, userId) =>
  db.one(`
    SELECT * FROM ${groupTable}
    WHERE ${field} = $1 AND user_id = $2`, [value, userId]);

Group.getTasksForOne = (id, userId) =>
  db.manyOrNone(`
    SELECT * FROM tasks
    WHERE group_id = $1 AND user_id = $2
  `, [id, userId]);

Group.create = group =>
  db.one(`
    INSERT INTO ${groupTable}
    (name, description, attributes, user_id)
    VALUES
    (
    $/name/,
    $/description/,
    $/user_id/,
    $/attributes/
    )
    RETURNING *`, group);

Group.update = group =>
  db.one(`
    UPDATE ${groupTable}
    SET
    name = $/name/,
    description = $/description/,
    attributes = $/attributes/
    WHERE
    id = $/id/ AND user_id = $/user_id/
    RETURNING *`, group);

Group.destroy = id =>
  db.none(`DELETE FROM ${groupTable} WHERE id = $1`, [id]);

module.exports = Group;
