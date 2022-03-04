import { Router } from 'express';
import authenticate from '../middleware/authenticate';
import {  Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import User from '../models/User';
const jwt = require('jsonwebtoken');

const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
.post('/', async (req:Request, res:Response, next:NextFunction) => {
  const { email, password  } = req.body;
  try {
    const user = await UserService.create({ email, password });
    const sessionToken = await UserService.signIn({ email, password });

    res   
      .cookie(process.env.COOKIE_NAME as string, sessionToken, {
        // secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        maxAge: ONE_DAY,
        // sameSite: 'none'
      })
      .json({ message: 'Signed in successfully!' , user});
      
  } catch (error) {
    next(error);
  }
})

.get('/user', authenticate,  async (req:any, res:Response, next:NextFunction) => {
  try {
    const { user } = req;
    res.json(user)
  } catch (error) {
    next(error);
  }
})

.post('/session', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.getByEmail(email);
    const sessionToken = await UserService.signIn({ email, password });

    res   
      .cookie(process.env.COOKIE_NAME as string, sessionToken, {
        httpOnly: true,
        maxAge: ONE_DAY,
      })
      .json({ message: 'Signed in successfully!', user });
         
  } catch (error) {
    next(error);
  }
})

  .delete('/session', (req:Request, res:Response) => {
    res
      .clearCookie(process.env.COOKIE_NAME as string)
      .json({ success: true, message: 'Signed out successfully!' });
  });


const sign = (payload: any) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};
  