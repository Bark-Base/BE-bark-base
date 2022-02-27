import { pool } from '../utils/pool';

export default class Medical {
  medicalId;
  vetId; 
  medicines;
  notes;
  nextApt;
  petId; 
  
  constructor(row:any) {
    this.medicalId = row.medical_id;
    this.vetId = row.vet_id;
    this.medicines = row.medicines;
    this.notes = row.notes;
    this.nextApt = row.next_appt;
    this.petId = row.pet_id;
  
  }

  static async insert({  vetId, medicines, notes,  nextApt , petId }:{  medicines:string, vetId:string, nextApt:string, petId:number, notes:string }): Promise<Medical> {
    const { rows } = await pool.query(
      'INSERT INTO medical_info ( vet_id, medicines, notes, next_appt, pet_id ) VALUES ($1, $2, $3, $4, $5 ) RETURNING *;',
      [ vetId, medicines, notes, nextApt, petId ]
    );
    return new Medical(rows[0]);
  }
// this getById will return the medical record linked to this pet
  static async getById(petId : any): Promise<Medical> {
    const { rows } = await pool.query('SELECT * FROM medical_info WHERE pet_id = $1', [petId]);
    return new Medical(rows[0]);
  }

  static async updateById(medicalId:any, { vetId, medicines, notes,  nextApt , petId}:{ medicines:string, vetId:number, notes:string, nextApt:Date, petId:any}): Promise<Medical> {
    const { rows } = await pool.query(
      'UPDATE medical_info SET vet_id = $1, medicines = $2,  notes = $3, next_appt = $4, pet_id = $5 WHERE medical_id = $6 RETURNING *',
      [ vetId, medicines, notes,  nextApt , petId, medicalId ]
    );
    return new Medical(rows[0]);
  }

  static async deleteById(medicalId: any): Promise<Medical | null> {
    const { rows } = await pool.query(
      'DELETE FROM medical_info WHERE medical_id = $1 RETURNING *;',
      [medicalId]
    );
    if (!rows[0]) return null;
    return new Medical(rows[0]);
  }
};