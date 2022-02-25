import { pool } from '../utils/pool';

module.exports = class Pet {
  id;
  ownerId;
  name;
  birthday;
  imageUrl;
  medicalId;

  constructor(row:any) {
    this.id = row.id;
    this.ownerId = row.owner_id;
    this.name = row.name;
    this.birthday = row.birthday;
    this.imageUrl = row.image_url;
    this.medicalId = row.medical_id;
  }

  static async insert({ ownerId, name, birthday, imageUrl, medicalId}:{ ownerId:number, name:string, birthday:any, imageUrl:string, medicalId:any }) {
    const { rows } = await pool.query(
      'INSERT INTO pets (ownerId, name, birthday, image_url, medical_id) VALUES ($1, $2,$3, $4, $5) RETURNING *;',
      [ownerId, name, birthday, imageUrl, medicalId]
    );
    return new (rows[0]);
  }

  static async getAll(id: any) {
    const { rows } = await pool.query('SELECT * FROM Pets');
    return rows.map((row) => new Pet(row));
  }

  static async getById(id:any) {
    const { rows } = await pool.query(
      `SELECT FROM pets
       WHERE id=$1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Pet(rows[0]);
  }

  static async updateById(id:any, { name, birthday, imageUrl}:{ name:any, birthday:any, imageUrl:any}) {
    const { rows } = await pool.query(
      'UPDATE reviewers SET name = $1, birthday = $2 WHERE id = $3 RETURNING *',
      [ name, birthday, imageUrl, id]
    );
    return new Pet(rows[0]);
  }

  static async deleteById(id: any) {
    const { rows } = await pool.query(
      'DELETE FROM reviewers WHERE id = $1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Pet(rows[0]);
  }
};