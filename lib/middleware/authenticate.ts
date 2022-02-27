import  jwt  from 'jsonwebtoken';
import {  Request, Response, NextFunction } from 'express';

module.exports = async (req:any, res:Response, next:NextFunction) => {
  try {
    const cookie:string = req.cookies[process.env.COOKIE_NAME as string];

    // Check the httpOnly session cookie for the current user
    if (!cookie) throw new Error('You must be signed in to continue');

    // Verify the JWT token stored in the cookie, then attach to each request
    const user: string | jwt.JwtPayload = jwt.verify(cookie, process.env.JWT_SECRET as string);
    req.user = user;

    next();
  } catch (err:any) {
    err.status = 401;
    
    next(err);
  }
};
