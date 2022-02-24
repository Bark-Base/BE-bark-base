import * as bcrypt  from 'bcrypt';
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password, secretAnswer }: {email:string, password:string, secretAnswer:string}) {
    const passwordHash = await bcrypt.hash(
      password, 
      Number(process.env.SALT_ROUNDS)

    );
    const secretHash = await bcrypt.hash(
        secretAnswer, 
        Number(process.env.SALT_ROUNDS)
      );

    const user = await User.insert({
      email,
      passwordHash,
      secretHash,
    });
    return user;
  }

  static async signIn({ email, password = '', secretAnswer= '' } :{email:string, password:string, secretAnswer:string}) {
    try {
      const user = await User.getByEmail(email);

      if(!user) throw new Error('Invalid email');
      if(!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');
      if(!bcrypt.compareSync(secretAnswer, user.secretHash))
        throw new Error('Invalid secret Answer');
        
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error:any) {
      error.status = 401;
      throw error;
    }
  }
};