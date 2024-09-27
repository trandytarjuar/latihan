import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const loginSchema = Joi.object({
  nip: Joi.number().required(),
  password: Joi.string().required(),
});

const loginSchemaCms = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};

export const validateLoginCms = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchemaCms.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};
