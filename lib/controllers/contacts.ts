const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
import {  Request, Response, NextFunction } from 'express';
const Contact = require('../models/Contact')
const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
.post('/', authenticate, async (req:Request, res:Response, next:NextFunction) => {
  const {type, name, phone, email, address, ownerId, petId } = req.body;
  try {
    const contact = await Contact.insert({ type, name, phone, email, address, ownerId, petId });
    res.json(contact);
  } catch (error) {
    next(error);
  }
})
.get('/:id', authenticate, async (req:Request, res:Response, next:NextFunction) => {
    //for the get all contacts method the id should be the users(id)
    const { id } = req.params;
    try { 
      const contacts = await Contact.getAll(id);
      res.send(contacts);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', authenticate, async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
       
    try {
      const contact = await Contact.updateById(id, req.body);
      res.json(contact);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', authenticate, async (req:Request, res:Response) => {
    const { id } = req.params;

    const contact = await Contact.delete(id);
    res.json(contact);
  });
