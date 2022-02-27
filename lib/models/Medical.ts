import { pool } from '../utils/pool';

module.exports = class Medical {
  id;
  vetId; // references contacts(contact_id) for vet
  medicines;
  notes;
  nextApt;
  petId; // references pets(pet_id)
  
  constructor(row:any) {
    this.id = row.medical_id;
    this.vetId = row.vet_id;
    this.medicines = row.medicines;
    this.notes = row.notes;
    this.nextApt = row.next_appt;
    this.petId = row.pet_id;
  
  }

  static async insert({  vetId, medicines, notes,  nextApt , petId }:{  medicines:string, vetId:string, nextApt:string, petId:number, notes:string }) {
    const { rows } = await pool.query(
      'INSERT INTO medical_info ( vetId, medicines, notes, next_appt, pet_id ) VALUES ($1, $2, $3, $4, $5 ) RETURNING *;',
      [ vetId, medicines, notes, nextApt, petId ]
    );
    return new (rows[0]);
  }

  static async getById(petId : any) {
    const { rows } = await pool.query('SELECT * FROM medical_info WHERE pet_id = $1', [petId]);
    return rows.map((row) => new Medical(row));
  }

  static async updateById(id:any, { vetId, medicines, notes,  nextApt , petId}:{ medicines:any, vetId:any, notes:any, nextApt:any, petId:any}) {
    const { rows } = await pool.query(
      'UPDATE medical_info SET vetId = $1, medicines = $2,  notes = $3, nextApt = $4, owner_id = $5, pet_id = $6, WHERE medical_id = $8 RETURNING *',
      [ vetId, medicines, notes,  nextApt , petId, id ]
    );
    return new Medical(rows[0]);
  }

  static async deleteById(id: any) {
    const { rows } = await pool.query(
      'DELETE FROM medical_info WHERE medical_id = $1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Medical(rows[0]);
  }
};