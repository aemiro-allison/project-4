const db = require('../config/db');

const Group = {};
const groupTable = 'groups';

Group.all = () =>
  db.query(`SELECT * FROM ${groupTable}`);

Group.findOne = (field, value) =>
  db.one(`
    SELECT * FROM ${groupTable}
    WHERE ${field} = $1`, [value]);

Group.create = group =>
  db.one(`
    INSERT INTO ${groupTable}
    (priority_lvl, estimated_time, attributes)
    VALUES
    (
    $/priority_lvl/,
    $/estimated_time/,
    $/attributes/
    )
    RETURNING *`, group);

Group.update = group =>
  db.one(`
    UPDATE ${groupTable}
    SET
    priority_lvl = $/priority_lvl/,
    estimated_time = $/estimated_time/,
    attributes = $/attributes/
    WHERE
    id = $/id/
    RETURNING *`, group);

Group.destroy = id =>
  db.none(`DELETE FROM ${groupTable} WHERE id = $1`, [id]);

module.exports = Group;
