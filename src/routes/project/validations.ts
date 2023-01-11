import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { CriticalType, ProjectType } from './types';

const createProject = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    projectName: Joi.string()
      .min(3)
      .max(35)
      .regex(/^[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ'&-/ ]*$/)
      .trim()
      .required()
      .messages({
        'any.required': 'El nombre de proyecto es requerido',
        'string.min': 'El nombre debe contener al menos 3 caracteres',
        'string.max': 'El nombre no debe contener más de 35 caracteres',
        'string.pattern.base': 'El nombre debe contener solo letras y numeros',
      }),

    description: Joi.string().max(100).allow('').messages({
      'string.max': 'La descripción no debe contener más de 100 caracteres',
    }),

    startDate: Joi.date().allow(null),

    endDate: Joi.date()
      .greater(Joi.ref('startDate'))
      .messages({
        'date.greater': 'Fecha de finalización debe ser posterior a la fecha de inicio',
      })
      .allow(null),

    isCritic: Joi.string()
      .valid(CriticalType.ALTA, CriticalType.MEDIA, CriticalType.BAJA)
      .messages({
        'any.only': 'La criticidad debe ser Alta, Media o Baja',
        'any.required': 'La criticidad del proyecto es requerida',
      })
      .required(),

    projectType: Joi.string()
      .valid(ProjectType.PRODUCT_BUILDING, ProjectType.STAFF_AUGMENTATION)
      .required()
      .messages({
        'any.only': 'El tipo de proyecto debe ser Project Building o Staff Augmentation',
        'any.required': 'El tipo de proyecto es requerido',
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

const editProject = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    projectName: Joi.string()
      .min(3)
      .max(35)
      .regex(/^[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ'&-/ ]*$/)
      .trim()
      .messages({
        'string.min': 'El nombre debe contener al menos 3 caracteres',
        'string.max': 'El nombre no debe contener más de 35 caracteres',
        'string.pattern.base': 'El nombre debe contener solo letras y numeros',
      }),

    description: Joi.string()
      .max(100)
      .messages({
        'string.max': 'La descripción no debe contener más de 100 caracteres',
      })
      .allow(''),

    startDate: Joi.date().allow(null),

    endDate: Joi.date()
      .greater(Joi.ref('startDate'))
      .messages({
        'date.greater': 'Fecha de finalización debe ser posterior a la fecha de inicio',
      })
      .allow(null),

    isCritic: Joi.string()
      .valid(CriticalType.ALTA, CriticalType.MEDIA, CriticalType.BAJA)
      .messages({
        'any.only': 'La criticidad debe ser Alta, Media o Baja',
      }),

    projectType: Joi.string()
      .valid(ProjectType.PRODUCT_BUILDING, ProjectType.STAFF_AUGMENTATION)
      .messages({
        'any.only': 'El tipo de proyecto debe ser Project Building o Staff Augmentation',
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

export default {
  createProject,
  editProject,
};
