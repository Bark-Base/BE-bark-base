const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
import {  Request, Response, NextFunction } from 'express';
const UserService = require('../services/UserService')

const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
.post('/', async (req:Request, res:Response, next:NextFunction) => {
  const { email, password  } = req.body;
  try {
    const user = await UserService.create({ email, password });
    const sessionToken = await UserService.signIn({ email, password });

    res   
      .cookie(process.env.COOKIE_NAME as string, sessionToken, {
        httpOnly: true,
        maxAge: ONE_DAY,
      })
      .json({ message: 'Signed in successfully!' });
  } catch (error) {
    next(error);
  }
})
.post('/', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { email, password } = req.body;
    const sessionToken = await UserService.signIn({ email, password });

    res   
      .cookie(process.env.COOKIE_NAME as string, sessionToken, {
        httpOnly: true,
        maxAge: ONE_DAY,
      })
      .json({ message: 'Signed in successfully!' });
         
  } catch (error) {
    next(error);
  }
})

  .delete('/sessions', (req:Request, res:Response) => {
    res
      .clearCookie(process.env.COOKIE_NAME as string)
      .json({ success: true, message: 'Signed out successfully!' });
  });


const sign = (payload: any) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};
  