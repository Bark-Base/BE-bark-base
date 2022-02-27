import { pool } from '../utils/pool';

module.exports = class Contact {
  id;
  type;
  name;
  phone;
  email;
  address;
  ownerId;
  petId;
  
  constructor(row:any) {
    this.id = row.contact_id;
    this.type = row.type;
    this.name = row.name;
    this.phone = row.phone;
    this.email = row.email;
    this.address = row.medical_id;
    this.ownerId = row.owner_id;
    this.petId = row.pet_id;
  }

  static async insert({  type, name, phone,  email, address, ownerId, petId }:{ ownerId:number, name:string, type:string, email:string, address:string, petId:number, phone:any }) {
    const { rows } = await pool.query(
      'INSERT INTO contacts ( type, name, phone, email, address, owner_id, pet_id ) VALUES ($1, $2,$3, $4, $5, $6, $7) RETURNING *;',
      [ type, name, phone,  email, address, ownerId, petId]
    );
    return new Contact(rows[0]);
  }

  static async getAll(ownerId: any) {
    const { rows } = await pool.query('SELECT * FROM contacts WHERE owner_id = $1',[ownerId]);
    return rows.map((row) => new Contact(row));
  }

  static async updateById(id:any, { name, type, phone, email, address, ownerId, petId}:{ name:any, type:any, phone:any, email:any, address:any, ownerId:any, petId:any}) {
    const { rows } = await pool.query(
      'UPDATE contacts SET name = $1, type = $2, phone = $3, email= $4, address = $5, owner_id = $6, pet_id = $7, WHERE contact_id = $8 RETURNING *',
      [ name, type, phone, email, address, ownerId, petId, id ]
    );
    return new Contact(rows[0]);
  }

  static async deleteById(id: any) {
    const { rows } = await pool.query(
      'DELETE FROM contacts WHERE contact_id = $1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Contact(rows[0]);
  }
};