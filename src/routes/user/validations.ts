import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { AccessRoleType } from 'src/types';

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    accessRoleType: Joi.string()
      .valid(
        AccessRoleType.ADMIN,
        AccessRoleType.EMPLOYEE,
        AccessRoleType.MANAGER,
        AccessRoleType.SUPER_ADMIN,
      )
      .messages({
        'any.only': 'El rol de acceso debe ser Admin, Empleado, Manager o Super Admin',
      }),

    email: Joi.string()
      .regex(/^[a-zA-Z.]*@radiumrocket.com/)
      .messages({
        'string.pattern.base': 'Formato de mail invalido',
        'string.empty': 'El email es requerido',
      }),

    firstName: Joi.string()
      .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
      .min(3)
      .messages({
        'string.base': 'El nombre debe contener solo letras',
        'string.empty': 'El nombre es requerido',
        'string.min': 'El nombre debe contener más de 3 letras',
      })
      .required(),

    lastName: Joi.string()
      .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
      .min(3)
      .messages({
        'string.pattern.base': 'El apellido debe contener solo letras',
        'string.empty': 'El apellido es requerido',
        'string.min': 'El apellido debe contener más de 3 letras',
      })
      .required(),

    location: Joi.string()
      .min(3)
      .messages({
        'string.base': 'La localidad debe ser un string',
        'string.empty': 'La localidad es requerida',
        'string.min': 'La localidad debe contener al menos 3 letras',
      })
      .required(),

    birthDate: Joi.date()
      .greater('1-1-1900')
      .less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
      .messages({
        'date.greater': 'La fecha debe ser posterior a 1-1-1900',
        'date.less': 'El usuario debe ser mayor de 18 años',
      })
      .required(),

    isActive: Joi.boolean()
      .messages({
        'string.base': 'El status tiene que ser un boolean',
        'string.empty': 'El status es requerido',
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
    accessRoleType: Joi.string()
      .valid(
        AccessRoleType.ADMIN,
        AccessRoleType.EMPLOYEE,
        AccessRoleType.MANAGER,
        AccessRoleType.SUPER_ADMIN,
      )
      .messages({
        'any.only': 'El rol de acceso debe ser Admin, Empleado, Manager o Super Admin',
      }),

    email: Joi.string()
      .regex(/^[a-zA-Z.]*@radiumrocket.com/)
      .messages({
        'string.pattern.base': 'Formato de email invalido',
      }),

    firstName: Joi.string()
      .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
      .min(3)
      .messages({
        'string.base': 'El nombre debe contener solo letras',
        'string.min': 'El nombre debe contener más de 3 letras',
      }),

    lastName: Joi.string()
      .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
      .min(3)
      .messages({
        'string.pattern.base': 'El apellido debe contener solo letras',
        'string.min': 'El apellido debe contener más de 3 letras',
      }),

    location: Joi.string().min(3).max(30).messages({
      'string.base': 'La localidad debe ser un string',
      'string.min': 'La localidad debe tener al menos 3 letras',
      'string.max': 'La localidad debe tener máximo 30 caracteres',
    }),

    birthDate: Joi.date()
      .greater('1-1-1900')
      .less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
      .messages({
        'date.greater': 'La fecha debe ser posterior a 1-1-1900',
        'date.less': 'El usuario debe ser mayor de 18 años',
      }),

    isActive: Joi.boolean(),
    'string.base': 'El status tiene que ser un boolean',
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
