DROP TABLE users_roles;
DROP TABLE users;
DROP TABLE roles;

CREATE TABLE users
(
	user_id serial PRIMARY KEY,
	user_name varchar(32) UNIQUE NOT NULL,
	user_password varchar NOT NULL
);

CREATE TABLE roles
(
	role_id int PRIMARY KEY,
	role_name varchar(64) UNIQUE NOT NULL
);

CREATE TABLE users_roles
(
	user_id int NOT NULL,
	role_id int NOT NULL,
	
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id),
	CONSTRAINT fk_role_id FOREIGN KEY(role_id) REFERENCES roles(role_id)
);

INSERT INTO roles
VALUES
(1, 'ADMIN'),
(2, 'USER');

INSERT INTO users (user_name, user_password)
VALUES
('user', 'user'),
('admin', 'admin');

INSERT INTO users_roles
VALUES 
(1,1);

SELECT *
FROM users;

SELECT *
FROM roles;

SELECT *
FROM users_roles



DELETE FROM users_roles WHERE user_id = (SELECT user_id
										 FROM users
										 WHERE user_name = ' ');
DELETE FROM users WHERE user_name = ' ';