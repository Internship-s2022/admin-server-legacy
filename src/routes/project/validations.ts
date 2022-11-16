import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { CriticalType, ProjectType } from './types';

const createProject = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    projectName: Joi.string().min(3).max(35).trim().required().messages({
      'any.required': 'Este campo es requerido',
      'string.min': 'El nombre debe contener al menos 3 caracteres',
      'string.max': 'El nombre no debe contener más de 35 caracteres',
    }),

    description: Joi.string().max(100).allow('').messages({
      'string.max': 'La descripción no debe contener más de 100 caracteres',
    }),

    startDate: Joi.date(),

    endDate: Joi.date().greater(Joi.ref('startDate')).messages({
      'date.greater': 'La fecha de finalización debe ser posterior a la fecha de inicio',
    }),

    isCritic: Joi.string()
      .valid(CriticalType.ALTA, CriticalType.MEDIA, CriticalType.BAJA)
      .messages({
        'any.only': 'La criticidad debe ser Alta, Media o Baja',
        'any.required': 'Este campo es requerido',
      })
      .required(),

    projectType: Joi.string()
      .valid(ProjectType.PRODUCT_BUILDING, ProjectType.STAFF_AUGMENTATION)
      .required()
      .messages({
        'any.only': 'El tipo de proyecto debe ser Project Building o Staff Augmentation',
        'any.required': 'Este campo es requerido',
      }),
  }).options({ allowUnknown: true });

  const validate = schema.validate(req.body);
  if (validate.error) {
    console.log(validate.error.details);
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
    projectName: Joi.string().min(3).max(35).trim().messages({
      'string.min': 'El nombre debe contener al menos 3 caracteres',
      'string.max': 'El nombre no debe contener más de 35 caracteres',
    }),

    description: Joi.string()
      .max(100)
      .messages({
        'string.max': 'La descripción no debe contener más de 100 caracteres',
      })
      .allow(''),

    startDate: Joi.date(),

    endDate: Joi.date().greater(Joi.ref('startDate')).messages({
      'date.greater': 'La fecha de finalización debe ser posterior a la fecha de inicio',
    }),

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
