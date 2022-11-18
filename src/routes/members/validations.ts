import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { RoleType } from 'src/types';

const createMember = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    employee: Joi.string()
      .messages({
        'any.required': 'Este campo es requerido',
        'string.empty': 'Este campo es requerido',
      })
      .required(),

    role: Joi.string()
      .valid(RoleType.DEV, RoleType.QA, RoleType.UI_UX, RoleType.TL, RoleType.PM)
      .messages({
        'any.only': 'El rol debe ser DEV, QA, UX/UI, TL o PM',
        'any.required': 'Este campo es requerido',
      })
      .required(),

    memberDedication: Joi.number()
      .min(0)
      .max(100)
      .messages({
        'any.required': 'Este campo es requerido',
        'number.min': 'El porcentaje de dedicacion debe ser mayor a 0',
        'number.max': 'El porcentaje de dedicacion debe ser menor a 100',
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
          'any.required': 'Este campo es requerido',
          'number.min': 'El porcentaje de dedicacion debe ser mayor a 0',
          'number.max': 'El porcentaje de dedicacion debe ser menor a 100',
        })
        .required(),
    }),

    startDate: Joi.date(),

    endDate: Joi.date().greater(Joi.ref('startDate')).messages({
      'date.greater': 'La fecha de finalización debe ser posterior a la fecha de inicio',
    }),
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
    hasHelper: Joi.boolean().messages({
      'boolean.base': 'Value must be a boolean',
    }),
    helper: Joi.array().items(
      Joi.object({
        helperReference: Joi.string().alphanum().length(24).messages({
          'string.base': 'Helper Reference must be a string',
          'string.length': 'Helper Reference must be exactly 24 characters',
          'string.empty': 'Helper Reference id is a required field',
        }),
        dependency: Joi.number().min(0).max(100).messages({
          'number.base': 'Dependency must be a number',
          'number.max': 'The dependence cannot be greater than 100 ',
          'number.min': 'The dependence cannot be less than 1',
        }),
        dedication: Joi.number().min(1).max(100).messages({
          'number.base': 'Dedication must be a number',
          'number.max': 'The dedication cannot be greater than 100 ',
          'number.min': 'The dependence cannot be less than 1',
        }),
        isActive: Joi.boolean().messages({
          'boolean.base': 'is Active has to be a boolean',
          'any.required': 'Helper status is a required field',
        }),
      }),
    ),
    employee: Joi.string().messages({
      'string.base': 'Employee id must be a string',
    }),
    project: Joi.string().messages({
      'string.base': 'Project id must be a string',
    }),
    role: Joi.string()
      .valid(RoleType.DEV, RoleType.PM, RoleType.QA, RoleType.TL, RoleType.UI_UX)
      .messages({
        'any.only': 'Role must be DEV, PM, TL, QA, or UI_UX',
      }),
    dedication: Joi.number().messages({ 'any.only': 'Dedication must be a number' }),
    startDate: Joi.date().greater('now').messages({
      'date.greater': 'Start date must be later than now',
    }),
    endDate: Joi.date().greater('now').messages({
      'date.greater': 'Start date must be later than now',
    }),
    active: Joi.boolean().messages({
      'boolean.base': 'Status has to be a boolean',
    }),
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
