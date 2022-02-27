import { pool } from '../utils/pool';

module.exports = class Pet {
  id;
  ownerId;
  name;
  birthday;
  imageUrl;


  constructor(row: { pet_id: any; owner_id: any; name: any; birthday: any; image_url: any; medical_id: any; }) {
    this.id = row.pet_id;
    this.ownerId = row.owner_id;
    this.name = row.name;
    this.birthday = row.birthday;
    this.imageUrl = row.image_url;
    
  }

  static async insert({ ownerId, name, birthday, imageUrl, }:{ ownerId:number, name:string, birthday:any, imageUrl:any, }) {
    const { rows } = await pool.query(
      'INSERT INTO pets (owner_id, name, birthday, image_url) VALUES ($1, $2, $3, $4) RETURNING *;',
      [ownerId, name, birthday, imageUrl ]
    );
    return new Pet(rows[0]);
  }

  static async getAll(ownerId: any) {
    const { rows } = await pool.query('SELECT * FROM Pets WHERE owner_id=$1', [ownerId]);
    return rows.map((row) => new Pet(row));
  }

  static async getById(id:number) {
    const { rows } = await pool.query(
      `SELECT * FROM pets
       WHERE pet_id=$1`,
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