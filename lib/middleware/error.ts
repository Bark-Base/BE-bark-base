import { Request, Response } from 'express';

module.exports = (err: any, req: Request, res: Response) => {
  const status = err.status || 500;
  const message = err.message;
  res.status(status);

  console.log(err);

  res.json({
    status,
    message1: 'you must be signed in ',
    message: err.message,
  });
};
