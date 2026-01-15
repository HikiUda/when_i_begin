DROP TABLE IF EXISTS purches;
DROP TABLE IF EXISTS sneakers;


CREATE TABLE sneakers
(
	sneakers_id serial PRIMARY KEY,
	title varchar NOT NULL,
	price int NOT NULL,
	img varchar NOT NULL,
	in_cart boolean DEFAULT false,
	is_liked boolean DEFAULT false
);

CREATE TABLE purches
(
	purches_id serial PRIMARY KEY,
	sneakers_id int NOT NULL,

	CONSTRAINT fk_sneakers_id FOREIGN KEY(sneakers_id) REFERENCES sneakers(sneakers_id)
);

INSERT INTO sneakers (title, price, img)
VALUES
('Мужские Кроссовки Nike Blazer Mid Suede', 12999, 'http://localhost:3000/sneakers/1.jpg'),
('Мужские Кроссовки Nike Air Max 270', 11999, 'http://localhost:3000/sneakers/2.jpg'),
('Мужские Кроссовки Nike Blazer Mid Suede', 8499, 'http://localhost:3000/sneakers/3.jpg'),
('Кроссовки Puma X Aka Boku Future Rider', 8999, 'http://localhost:3000/sneakers/4.jpg'),
('Мужские Кроссовки Under Armour Curry 8', 15199, 'http://localhost:3000/sneakers/5.jpg'),
('Мужские Кроссовки Nike Kyrie 7', 11299, 'http://localhost:3000/sneakers/6.jpg'),
('Мужские Кроссовки Jordan Air Jordan 11', 11799, 'http://localhost:3000/sneakers/7.jpg'),
('Мужские Кроссовки Nike LeBron XVIII', 16499, 'http://localhost:3000/sneakers/8.jpg'),
('Мужские Кроссовки Nike Lebron XVIII Low', 13999, 'http://localhost:3000/sneakers/9.jpg'),
('Мужские Кроссовки Nike Blazer Mid Suede', 8499, 'http://localhost:3000/sneakers/1.jpg'),
('Кроссовки Puma X Aka Boku Future Rider', 8999, 'http://localhost:3000/sneakers/4.jpg'),
('Мужские Кроссовки Nike Kyrie Flytrap IV', 11299, 'http://localhost:3000/sneakers/10.jpg');

SELECT * 
FROM sneakers
WHERE sneakers_id > 10
LIMIT 10
;

INSERT INTO purches (sneakers_id)
VALUES (1), (5);

SELECT * 
FROM purches
JOIN sneakers USING(sneakers_id)