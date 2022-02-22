// eslint-disable-next-line no-unused-vars

import {  Request, Response, NextFunction } from 'express';
module.exports = (err:any, req:Request, res:Response, next: NextFunction) => {
  const status = err.status || 500;

  res.status(status);

  console.log(err);

  res.send({
    status,
    message: err.message,
  });
};
