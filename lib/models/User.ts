import { pool } from '../utils/pool';

module.exports = class User {
  id;
  email;
  #secretHash;
  #passwordHash;

  constructor(row:any) {
    this.id = row.id;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
    this.#secretHash = row.secret_hash;
  }

  static async insert({ email, passwordHash, secretHash}: {
    email: string;
    passwordHash: string;
    secretHash: string;
}): Promise<User> {
    const { rows } = await pool.query(
      `
        INSERT INTO users ( email, password_hash, secret_hash)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [ email, passwordHash, secretHash]
    );
    return new User(rows[0]);
  }
  static async getByEmail(email:string) {
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
  get secretHash() {
    return this.#secretHash;
  }
};
