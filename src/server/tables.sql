CREATE TABLE IF NOT EXISTS hotpot (
  id SERIAL PRIMARY KEY,
  name TEXT,
  img TEXT,
  description TEXT
 );

CREATE TABLE IF NOT EXISTS action (
	id SERIAL PRIMARY KEY,
	name TEXT,
	img TEXT,
	description TEXT,
	type TEXT
);