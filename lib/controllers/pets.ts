import { Router } from 'express';
import authenticate from '../middleware/authenticate';
import { Request, Response, NextFunction } from 'express';
import Pet from '../models/Pet';
const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post(
    '/',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      const { ownerId, name, birthday, imageUrl } = req.body;
      try {
        const pet = await Pet.insert({ ownerId, name, birthday, imageUrl });

        res.json(pet);
      } catch (error) {
        next(error);
      }
    }
  )
  .get(
    '/all/:id',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const pets = await Pet.getAll(Number(id));
        res.json(pets);
      } catch (error) {
        next(error);
      }
    }
  )
  .get(
    '/:id',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const pets = await Pet.getById(Number(id));
        res.json(pets);
      } catch (error) {
        next(error);
      }
    }
  )
  .patch(
    '/:id',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      try {
        const pet = await Pet.updateById(Number(id), req.body);
        res.json(pet);
      } catch (err) {
        next(err);
      }
    }
  )
  .delete('/:id', authenticate, async (req: Request, res: Response) => {
    const { id } = req.params;

    const pet = await Pet.deleteById(id);

    res.json(pet);
  });
