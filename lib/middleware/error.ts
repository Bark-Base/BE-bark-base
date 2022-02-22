import {  Request, Response } from 'express';

module.exports = (err:any, req:Request, res:Response) => {
  const status = err.status || 500;

  res.status(status);

  console.log(err);

  res.send({
    status,
    message: err.message,
  });
};
