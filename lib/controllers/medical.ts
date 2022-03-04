import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import authenticate from '../middleware/authenticate';
import Medical from '../models/Medical';
const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post(
    '/',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      const { vetId, medicines, notes, nextApt, petId } = req.body;
      try {
        const medical = await Medical.insert({
          vetId,
          medicines,
          notes,
          nextApt,
          petId,
        });
        res.json(medical);
      } catch (error) {
        next(error);
      }
    }
  )

  .get(
    '/:id',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      //for the get all medicals method the id should be the pets(pet_id)
      const { id } = req.params;
      try {
        const medicals = await Medical.getById(id);
        res.send(medicals);
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
        const medical = await Medical.updateById(id, req.body);
        res.json(medical);
      } catch (err) {
        next(err);
      }
    }
  )
  .delete('/:id', authenticate, async (req: Request, res: Response) => {
    const { id } = req.params;

    const medical = await Medical.deleteById(id);
    res.json(medical);
  });
