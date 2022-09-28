import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { AccessRoleType } from 'src/models/user';

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firebaseUid: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.pattern': 'Invalid email',
        'string.empty': 'Email cannot be an empty field',
        'string.min': 'firebaseUid must not contain less than 3 letters',
      })
      .required(),

    accessRoleType: Joi.string()
      .valid(
        AccessRoleType.ADMIN,
        AccessRoleType.EMPLOYEE,
        AccessRoleType.MANAGER,
        AccessRoleType.SUPER_ADMIN,
      )
      .messages({
        'any.only': 'Access rol type must be one Admin, Employee, Manager or Super Admin',
      }),

    email: Joi.string()
      .regex(/^[a-zA-Z.]*@radiumrocket.com/)
      .messages({
        'string.pattern.base': 'Invalid email format',
        'string.empty': 'Email cannot be an empty field',
      }),

    firstName: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(3)
      .messages({
        'string.base': 'First name has to be a string',
        'string.empty': 'First name cannot be an empty field',
        'string.pattern': 'First name must contain only letters',
        'string.min': 'Invalid first name, it must not contain less than 3 letters',
      })
      .required(),

    lastName: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(3)
      .messages({
        'string.base': 'Last name has to be a string',
        'string.pattern': 'Last name must contain only letters',
        'string.empty': 'Last name cannot be an empty field',
        'string.min': 'Invalid Last name, it must not contain less than 3 letters',
      })
      .required(),

    location: Joi.string()
      .min(3)
      .messages({
        'string.base': 'Location has to be a string',
        'string.empty': 'Location cannot be an empty field',
        'string.min': 'Invalid last name, it must not contain less than 3 letters',
      })
      .required(),

    birthDate: Joi.date()
      .greater('1-1-1900')
      .less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
      .messages({
        'date.greater': 'You cannot be ',
        'date.less': 'Your must be over 18',
      })
      .required(),

    isActive: Joi.boolean().required(),
    'string.base': 'Location has to be a boolean',
    'string.empty': 'Location cannot be an empty field',
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

export default {
  createUser,
};
