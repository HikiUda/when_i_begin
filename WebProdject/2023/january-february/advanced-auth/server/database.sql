DROP TABLE tokens;
DROP TABLE users;

CREATE TABLE users
(   id serial PRIMARY KEY,
	email varchar UNIQUE NOT NULL,
	password varchar NOT NULL,
	is_activated boolean DEFAULT false,
	activation_link varchar NOT NULL
);

CREATE TABLE tokens
(
	user_id int PRIMARY KEY,
	refresh_token varchar NOT NULL,
	
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
);


SELECT *
FROM users;

SELECT *
FROM tokens;