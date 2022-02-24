-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users, pets;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    password_hash TEXT NOT NULL,
    secret_hash TEXT NOT NULL,
    email TEXT NOT NULL
);
INSERT INTO users (password_hash, secret_hash, email)
VALUES('hashshashshsa', 'shhdhshshsh', 'danbob@gmail.com')

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id REFERENCES users(id),
    name TEXT(15) NOT NULL,
    birthday DATE,
    image_url VARCHAR(155)
    medical_id INT,
)
INSERT INTO pets (owner_id, name, birthday, image_url)
VALUES('1','berlin','2022-01-01','http://www.placekitten.com')