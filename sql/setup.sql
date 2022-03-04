DROP TABLE IF EXISTS users Cascade;
DROP TABLE IF EXISTS pets Cascade;
DROP TABLE IF EXISTS contacts Cascade;
DROP TABLE IF EXISTS medical_info Cascade;

CREATE TABLE users (
    owner_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    password_hash TEXT NOT NULL,
    secret_hash TEXT,
    email TEXT NOT NULL UNIQUE
);
INSERT INTO users (password_hash, secret_hash, email)
VALUES('$2b$10$cYidLM7q1F449Qm3a/a9a.XbqC.U24OQCcYkVyYZTwGkIhv8cFIk6', 'shhdhshshsh', 'barkbase@web.com');

CREATE TABLE pets (
    pet_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id BIGINT REFERENCES users,
    name TEXT NOT NULL,
    birthday VARCHAR(10),
    image_url TEXT
);
INSERT INTO pets (owner_id, name, birthday, image_url)
VALUES(1,'Kharkiv','2022-01-01','http://www.placekitten.com');
INSERT INTO pets (owner_id, name, birthday, image_url)
VALUES(1,'Kyiv','2022-01-01','http://www.placekitten.com');
INSERT INTO pets (owner_id, name, birthday, image_url)
VALUES(1,'Odessa','2022-01-01','http://www.placekitten.com');

CREATE TABLE contacts (
    contact_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    phone VARCHAR(20),
    email TEXT,
    address TEXT,
    owner_id BIGINT REFERENCES users,
    pet_id BIGINT REFERENCES pets ON DELETE CASCADE
);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('vet','bob','555-555-1234','barkbase@gmail.com','123 bake st.',1,2);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('trainer','fred','111-555-5555','sample@gmail.com','456 cake st.',1,2);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('walker','texas','555-867-5309','ranger@gmail.com','789 faque st.',1,2);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('vet','bobbina','555-545-5555','ample@gmail.com','123 fake st.',1,1);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('trainer','frederick','555-555-5555','sample@gmail.com','123 fake st.',1,1);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('walker','etcetera','555-555-5555','sample@gmail.com','1213 fake st.',1,1);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('vet','bob ross','555-555-4656','simple@gmail.com','4123 lake st.',1,3);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('trainer','Jamba Juice','555-555-5555','sample@gmail.com','5123 pake st.',1,3);
INSERT INTO contacts (type,name,phone,email,address,owner_id,pet_id)
VALUES('walker','Todd','555-555-5555','sample@gmail.com','6123 make st.',1,3);

CREATE TABLE medical_info (
    medical_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vet_id BIGINT REFERENCES contacts(contact_id),
    medicines VARCHAR(30), 
    notes VARCHAR(2000),
    next_appt DATE,
    pet_id BIGINT REFERENCES pets ON DELETE CASCADE
);

INSERT INTO medical_info (vet_id, medicines, notes, next_appt, pet_id)
VALUES(1,'scotch','Take twice hourly', '2022-02-02', 1 );