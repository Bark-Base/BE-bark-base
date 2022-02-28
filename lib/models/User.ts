import { pool } from '../utils/pool';

export default class User {
  ownerId;
  email;
  #passwordHash;

  constructor(row:any) {
    this.ownerId = row.owner_id;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ email, passwordHash }: {
    email: string;
    passwordHash: any;
}): Promise<User> {
    const { rows } = await pool.query(
      `
        INSERT INTO users ( email, password_hash)
        VALUES ($1, $2)
        RETURNING *
      `,
      [ email, passwordHash ]
    );
    return new User(rows[0]);
  }
  static async getByEmail(email:string): Promise<User | null> {
    const { rows } = await pool.query(
      `
          SELECT *
          FROM users
          WHERE email=$1`,
      [email]
    );
    
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#passwordHash;
  }
  
};
