import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { RoleType } from 'src/types';

import { SeniorityType } from './types';

const editEmployee = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    skills: Joi.array().items(Joi.string().min(3).max(35)).messages({
      'string.min': 'Skills debe contener más de 2 letras',
      'string.max': 'Skills debe contener menos de 36 letras',
      'string.base': 'Skills debe ser un string',
    }),

    seniority: Joi.string().valid(SeniorityType.JR, SeniorityType.SR, SeniorityType.SSR).messages({
      'any.only': 'Seniority debe ser JR, SR o SSR',
    }),

    projectHistory: Joi.array()
      .items(Joi.string())
      .messages({ 'string.base': 'Los items del array deben ser strings' }),

    absences: Joi.array().items(
      Joi.object({
        startDate: Joi.date()
          .required()
          .messages({ 'any.only': 'La fecha de inicio es requerida' }),

        endDate: Joi.date()
          .greater(Joi.ref('startDate'))
          .message('La fecha de fin debe ser posterior a la fecha de inicio'),

        motive: Joi.string().min(3).max(120).required().messages({
          'string.base': 'El motivo debe ser un string',
          'string.min': 'El motivo tiene que ser al menos de 3 caracteres',
          'string.max': 'El motivo puede ser de hasta 120 caracteres',
        }),
      }),
    ),

    user: Joi.string().messages({
      'string.base': 'El Id del usuario debe ser un string',
    }),

    potentialRole: Joi.array().items(
      Joi.string()
        .valid(RoleType.DEV, RoleType.PM, RoleType.QA, RoleType.TL, RoleType.UX_UI)
        .messages({
          'any.only': 'El rol potencial debe ser DEV, QA, UX/UI, PM o TL',
          'string.base': 'Los items de array deben ser strings',
        }),
    ),

    notes: Joi.string().min(0).max(499).messages({
      'string.max': 'Las notas deben contener menos de 500 caracteres',
      'string.base': 'Las notas deben ser un string',
    }),

    availability: Joi.boolean(),
    careerPlan: Joi.string().min(0).max(499),
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
  editEmployee,
};
