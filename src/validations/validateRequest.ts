import { Request, Response, NextFunction } from 'express';
import Joi, { number } from 'joi';

export const validateRequest = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const checkCustomerId = (req: Request, res: Response, next: NextFunction) => {
  const { customerId } = req.params;
  const convertedId = parseInt(customerId);
  if (!customerId || isNaN(convertedId)) {
    return res.status(400).json({ error: 'Invalid customerId' });
  }
  next();
};

export const checkAddressId = (req: Request, res: Response, next: NextFunction) => {
  const { addressId } = req.params;
  const convertedId = parseInt(addressId);
  if (!addressId || isNaN(convertedId)) {
    return res.status(400).json({ error: 'Invalid addressId' });
  }
  next();
};

