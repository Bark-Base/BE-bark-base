import { pool } from '../utils/pool';

module.exports = class Medical {
  id;
  vetId;
  medicines;
  notes;
  nextApt;
  petId;
  
  constructor(row:any) {
    this.id = row.id;
    this.vetId = row.vet_id;
    this.medicines = row.medicines;
    this.notes = row.notes;
    this.nextApt = row.next_appt;
    this.petId = row.pet_id;
  
  }

  static async insert({  vetId, medicines, notes,  nextApt , petId }:{  medicines:string, vetId:string, nextApt:string, petId:number, notes:any }) {
    const { rows } = await pool.query(
      'INSERT INTO medical_info ( vetId, medicines, notes, email, address, pet_id ) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *;',
      [ vetId, medicines, notes, nextApt, petId ]
    );
    return new (rows[0]);
  }

  static async getAll(petId : any) {
    const { rows } = await pool.query('SELECT * FROM medical_info WHERE pet_id = $1'[petId]);
    return rows.map((row) => new Medical(row));
  }

  static async updateById(id:any, { vetId, medicines, notes,  nextApt , petId}:{ medicines:any, vetId:any, notes:any, email:any, nextApt:any, petId:any}) {
    const { rows } = await pool.query(
      'UPDATE medical_info SET vetId = $2, medicines = $1,  notes = $3,nextApt = $4, address = $5, owner_id = $6, pet_id = $7, WHERE id = $8 RETURNING *',
      [ vetId, medicines, notes,  nextApt , petId, id ]
    );
    return new Medical(rows[0]);
  }

  static async deleteById(id: any) {
    const { rows } = await pool.query(
      'DELETE FROM medical_info WHERE id = $1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Medical(rows[0]);
  }
};