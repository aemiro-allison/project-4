DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT REFERENCES users(id),
  attributes JSONB NOT NULL
);

CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  group_id INT REFERENCES groups(id),
  user_id INT REFERENCES users(id),
  attributes JSONB NOT NULL
);
