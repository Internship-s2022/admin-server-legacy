import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { RoleType } from 'src/types';

const createMember = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    employee: Joi.string()
      .messages({
        'any.required': 'Empleado es un campo requerido',
        'string.empty': 'Empleado es un campo requerido',
      })
      .required(),

    role: Joi.string()
      .valid(RoleType.DEV, RoleType.QA, RoleType.UX_UI, RoleType.TL, RoleType.PM)
      .messages({
        'any.only': 'El rol debe ser DEV, QA, UX/UI, TL o PM',
        'any.required': 'Rol es un campo requerido',
      })
      .required(),

    project: Joi.string()
      .messages({
        'any.required': 'Proyecto es un campo requerido',
        'string.empty': 'Proyecto es un campo requerido',
      })
      .required(),

    memberDedication: Joi.number()
      .min(0)
      .max(100)
      .messages({
        'any.required': 'Dedicación del miembro es un campo requerido',
        'number.min': 'El porcentaje de dedicación debe ser mayor a 0',
        'number.max': 'El porcentaje de dedicación debe ser menor a 100',
      })
      .required(),

    helper: Joi.object({
      helperReference: Joi.string()
        .messages({
          'any.required': 'Este campo es requerido',
          'string.empty': 'Este campo es requerido',
        })
        .required(),
      dependency: Joi.number()
        .min(0)
        .max(100)
        .messages({
          'any.required': 'Este campo es requerido',
          'number.min': 'El porcentaje de dependencia debe ser mayor a 0',
          'number.max': 'El porcentaje de dependencia debe ser menor a 100',
        })
        .required(),
      dedication: Joi.number()
        .min(0)
        .max(100)
        .messages({
          'any.required': 'Dedicación es un campo requerido',
          'number.min': 'El porcentaje de dedicación debe ser mayor a 0',
          'number.max': 'El porcentaje de dedicacion debe ser menor a 100',
        })
        .required(),
    }),

    startDate: Joi.date().allow(null),

    endDate: Joi.date()
      .greater(Joi.ref('startDate'))
      .messages({
        'date.greater': 'Fecha de finalización debe ser posterior a la fecha de inicio',
      })
      .allow(null),
  }).options({ allowUnknown: true });

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

const editMember = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    employee: Joi.string(),

    project: Joi.string(),

    role: Joi.string()
      .valid(RoleType.DEV, RoleType.QA, RoleType.UX_UI, RoleType.TL, RoleType.PM)
      .messages({
        'any.only': 'El rol debe ser DEV, QA, UX/UI, TL o PM',
      }),

    memberDedication: Joi.number().min(0).max(100).messages({
      'number.min': 'El porcentaje de dedicación debe ser mayor a 0',
      'number.max': 'El porcentaje de dedicación debe ser menor a 100',
    }),

    helper: Joi.object({
      helperReference: Joi.string(),

      dependency: Joi.number().min(0).max(100).messages({
        'number.min': 'El porcentaje de dependencia debe ser mayor a 0',
        'number.max': 'El porcentaje de dependencia debe ser menor a 100',
      }),
      dedication: Joi.number().min(0).max(100).messages({
        'number.min': 'El porcentaje de dedicación debe ser mayor a 0',
        'number.max': 'El porcentaje de dedicación debe ser menor a 100',
      }),
    }),

    startDate: Joi.date().allow(null),

    endDate: Joi.date()
      .greater(Joi.ref('startDate'))
      .messages({
        'date.greater': 'La fecha de finalización debe ser posterior a la fecha de inicio',
      })
      .allow(null),
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
  createMember,
  editMember,
};
