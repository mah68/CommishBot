CREATE TABLE pins(
	id SERIAL PRIMARY KEY NOT NULL,
	creator VARCHAR(50) NOT NULL,
	name VARCHAR(50) NOT NULL,
	content VARCHAR(500) NOT NULL
);