DROP TABLE IF EXISTS users, pets, contacts, medical_info;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    password_hash TEXT NOT NULL,
    secret_hash TEXT,
    email TEXT NOT NULL
);
INSERT INTO users (password_hash, secret_hash, email)
VALUES('hashshashshsa', 'shhdhshshsh', 'danbob@gmail.com');

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id BIGINT REFERENCES users(id),
    name TEXT NOT NULL,
    birthday DATE,
    image_url VARCHAR(155),
    medical_id INT
);
INSERT INTO pets (owner_id, name, birthday, image_url)
VALUES(1,'berlin','2022-01-01','http://www.placekitten.com');

CREATE TABLE contacts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    phone INT,
    email TEXT,
    address TEXT,
    owner_id BIGINT REFERENCES users(id),
    pet_id BIGINT REFERENCES pets(id)
);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('vet','bob',555-555-5555,'@gmail.com','123 fake st.',1,1);

CREATE TABLE medical_info (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vet_id BIGINT REFERENCES contacts(id),
    medicines VARCHAR(30), 
    notes VARCHAR(2000),
    next_appt DATE,
    pet_id BIGINT REFERENCES pets(id)
);

INSERT INTO medical_info (vet_id, medicines, notes, next_appt, pet_id)
VALUES('1','scotch','Take twice hourly', '2022-02-02', 1 )