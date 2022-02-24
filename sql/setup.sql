-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    password_hash TEXT NOT NULL,
    secret_hash TEXT NOT NULL,
    email TEXT NOT NULL
);
INSERT INTO users (password_hash, secret_hash, email)
VALUES('hashshashshsa', 'shhdhshshsh', 'danbob@gmail.com')