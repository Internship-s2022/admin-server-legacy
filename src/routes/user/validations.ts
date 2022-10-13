import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { AccessRoleType } from 'src/routes/user/types';

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firebaseUid: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'You have to use a valid firebaseUid',
        'string.empty': 'You have to add a firebaseUid to create an user',
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
        'string.pattern.base': 'You have to use a valid email',
        'string.empty': 'You have to add an email to create an user',
      }),

    firstName: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(3)
      .messages({
        'string.base': 'First name must contain only letters',
        'string.empty': 'You have to add a first name to create an username ',
        'string.min': 'First name must contain more than 3 letters',
      })
      .required(),

    lastName: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(3)
      .messages({
        'string.pattern.base': 'Last name must contain only letters',
        'string.empty': 'You have to add a last name to create an user ',
        'string.min': 'Last name must contain more than 3 letters',
      })
      .required(),

    location: Joi.string()
      .min(3)
      .messages({
        'string.base': 'Location has to be a string',
        'string.empty': 'You have to add a location to create an user',
        'string.min': 'Location must contain more than 3 letters',
      })
      .required(),

    birthDate: Joi.date()
      .greater('1-1-1900')
      .less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
      .messages({
        'date.greater': 'Date of birth must be earlier than 1900',
        'date.less': 'Your must be over 18',
      })
      .required(),

    isActive: Joi.boolean()
      .messages({
        'string.base': 'Status has to be a boolean',
        'string.empty': 'You have to add a status to create an user ',
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

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firebaseUid: Joi.string().min(3).max(35).messages({
      'string.base': 'You have to use a valid firebaseUid',
      'string.min': 'firebaseUid must not contain less than 3 letters',
    }),
    accessRoleType: Joi.string()
      .valid(
        AccessRoleType.ADMIN,
        AccessRoleType.EMPLOYEE,
        AccessRoleType.MANAGER,
        AccessRoleType.SUPER_ADMIN,
      )
      .messages({
        'any.only': 'Access rol type must be one ADMIN, EMPLOYEE, MANAGER or SUPER ADMIN',
      }),

    email: Joi.string()
      .regex(/^[a-zA-Z.]*@radiumrocket.com/)
      .messages({
        'string.base': 'You have to use a valid email',
      }),

    firstName: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(3)
      .messages({
        'string.base': 'First name must contain only letters',
        'string.min': 'First name must contain more than 3 letters',
      }),

    lastName: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(3)
      .messages({
        'string.base': 'Last name must contain only letters',
        'string.min': 'Last name must contain more than 3 letters',
      }),

    location: Joi.string().min(3).messages({
      'string.base': 'Location has to be a string',
      'string.min': 'Location must contain more than 3 letters',
    }),

    birthDate: Joi.date()
      .greater('1-1-1900')
      .less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
      .messages({
        'date.greater': 'Date of birth must be earlier than 1900',
        'date.less': 'Your must be over 18',
      }),

    isActive: Joi.boolean(),
    'string.base': 'Status has to be a boolean',
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
  updateUser,
};
