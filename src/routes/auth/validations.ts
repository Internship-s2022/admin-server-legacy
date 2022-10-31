import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firebaseUid: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'You have to use a valid firebaseUid',
        'any.required': 'FirebaseUid needed',
        'string.min': 'firebaseUid must contain at least 3 letters',
      })
      .required(),

    email: Joi.string()
      .regex(/^[a-zA-Z]+\.+[a-zA-Z]+@(radiumrocket.com)$/)
      .min(20)
      .trim()
      .messages({
        'string.pattern.base': 'You have to use a valid email',
        'any.required': 'You have to add an email to create an user',
        'string.min': 'Email must contain at least 3 characters',
      })
      .required(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  next();
};

export default { authenticateUser };
