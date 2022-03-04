import * as bcrypt from 'bcrypt';
import User from '../models/User';
const jwt = require('jsonwebtoken');

export default class UserService {
  static async create({
    email,
    password,
  }: {
    email: string;
    password: any;
  }): Promise<User> {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      email,
      passwordHash,
    });
    return user;
  }

  static async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    try {
      const user = await User.getByEmail(email);

      if (!user) throw new Error('Invalid email');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error: any) {
      error.status = 401;
      throw error;
    }
  }
}
