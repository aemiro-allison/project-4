DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  priority_lvl INT NOT NULL,
  estimated_time INT NOT NULL,
  attributes JSONB
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  priority_lvl INT NOT NULL,
  estimated_time INT NOT NULL,
  group_id INT REFERENCES groups(id),
  attributes JSONB
);
