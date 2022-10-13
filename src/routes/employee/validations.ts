import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { RoleType, SeniorityType } from './types';

const editEmployee = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    skills: Joi.array().items(Joi.string().min(3).max(35)).messages({
      'string.min': 'Skills must contain more than 2 letters',
      'string.max': 'Skills must contain less than 36 letters',
      'string.base': 'Skills must be a string',
    }),

    seniority: Joi.string()
      .valid(SeniorityType.JR, SeniorityType.SR, SeniorityType.SSR, SeniorityType.TRAINEE)
      .messages({
        'any.only': 'Seniority must be JR, SR, SSR or TRAINEE',
      }),

    projectHistory: Joi.array()
      .items(Joi.string())
      .messages({ 'string.base': 'Array items must be strings' }),

    absences: Joi.array()
      .items(Joi.string())
      .messages({ 'string.base': 'Array items must be strings' }),

    user: Joi.string().messages({
      'string.base': 'User Id must be a string',
    }),

    potentialRole: Joi.array().items(
      Joi.string()
        .valid(RoleType.DEV, RoleType.PM, RoleType.QA, RoleType.TL, RoleType.UI_UX)
        .messages({
          'any.only': 'Potential role must be DEV, QA, UI_UX, PM or TL',
          'string.base': 'Array items must be strings',
        }),
    ),

    notes: Joi.string().min(12).max(499).messages({
      'string.min': 'notes must contain more than 11 characters',
      'string.max': 'notes must contain less than 500 characters',
      'string.base': 'Notes must be a string',
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
  editEmployee,
};
