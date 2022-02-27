import { pool } from '../utils/pool';

module.exports = class Pet {
  id;
  ownerId;
  name;
  birthday;
  imageUrl;
  contacts;
  medical;


  constructor(row: { pet_id: number; owner_id: number; name: string; birthday: any; image_url: string; medical_id: number; contacts:[], medical_info:[] }) {
    this.id = row.pet_id;
    this.ownerId = row.owner_id;
    this.name = row.name;
    this.birthday = row.birthday;
    this.imageUrl = row.image_url;
    this.contacts = row.contacts || [];
    this.medical = row.medical_info || [];
    
  }

  static async insert({ ownerId, name, birthday, imageUrl, }:{ ownerId:number, name:string, birthday:any, imageUrl:any, }) {
    const { rows } = await pool.query(
      'INSERT INTO pets (owner_id, name, birthday, image_url) VALUES ($1, $2, $3, $4) RETURNING *;',
      [ownerId, name, birthday, imageUrl ]
    );
    return new Pet(rows[0]);
  }

  static async getAll(ownerId: any) {
    const { rows } = await pool.query(
      `SELECT pet_id FROM pets WHERE owner_id=$1`,
      [ownerId]
    );
    const ownersPets = rows.map((row) => new Pet(row));
    const ownerPetsArray = ownersPets.map((item)=> item.id);
    const newArr = [];
    for(let petId of ownerPetsArray){
      newArr.push(await this.getById(petId));
    }
    return newArr;
  }

  static async getById(id:number) {
    const { rows } = await pool.query(
      `SELECT pets.*,
      jsonb_agg(to_jsonb(contacts) - 'pet_id' - 'owner_id' - 'contact_id') AS contacts,
      jsonb_agg(to_jsonb(medical_info) -'pet_id' - 'id' - 'vet_id') AS medical_info
      FROM pets
      LEFT JOIN contacts
      ON contacts.pet_id = pets.pet_id
      LEFT JOIN medical_info
      ON medical_info.pet_id = pets.pet_id
       WHERE pets.pet_id=$1
       GROUP BY pets.pet_id`,
      [id]
    );

    if (!rows[0]) return null;
    return new Pet(rows[0]);
  }

  static async updateById(id:number, { name, birthday, imageUrl}:{ name:string, birthday:any, imageUrl:any}) {
    const { rows } = await pool.query(
      'UPDATE pets SET name = $1, birthday = $2, image_url = $3 WHERE id = $4 RETURNING *',
      [ name, birthday, imageUrl, id]
    );
    return new Pet(rows[0]);
  }

  static async deleteById(id: any) {
    const { rows } = await pool.query(
      'DELETE FROM pets WHERE pet_id = $1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Pet(rows[0],), { message: 'successful deletion'};
  }
};