import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { RoleType, SeniorityType } from './types';

const createEmployee = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    skills: Joi.array().items(Joi.string().min(3).max(35)).messages({
      'string.min': 'The skill must not contain less than 3 letters',
      'string.max': 'The name must not contain more than 35 letters',
    }),

    seniority: Joi.string()
      .valid(SeniorityType.JR, SeniorityType.SR, SeniorityType.SSR, SeniorityType.TRAINEE)
      .messages({
        'any.only': 'Seniority must be JR, SR, SSR or TRAINEE',
      })
      .required(),

    projectHistory: Joi.array().items(Joi.string()),

    absences: Joi.array().items(Joi.string()),

    userId: Joi.string().required().messages({
      'any.required': 'User Id is required to create an Employee',
    }),

    potentialRole: Joi.array().items(
      Joi.string()
        .valid(RoleType.DEV, RoleType.PM, RoleType.QA, RoleType.TL, RoleType.UI_UX)
        .messages({
          'any.only': 'Potential role must be DEV, QA, UI_UX, PM or TL',
        }),
    ),
    notes: Joi.string().min(12).max(500).messages({
      'string.min': 'notes must not contain less than 12 characters',
      'string.max': 'notes must not contain more than 500 characters',
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

const editEmployee = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    skills: Joi.array().items(Joi.string().min(3).max(35)).messages({
      'string.min': 'The skill must not contain less than 3 letters',
      'string.max': 'The name must not contain more than 35 letters',
    }),

    seniority: Joi.string()
      .valid(SeniorityType.JR, SeniorityType.SR, SeniorityType.SSR, SeniorityType.TRAINEE)
      .messages({
        'any.only': 'Seniority must be JR, SR, SSR or TRAINEE',
      }),

    projectHistory: Joi.array().items(Joi.string()),

    absences: Joi.array().items(Joi.string()),

    userId: Joi.string().messages({
      'any.required': 'User Id is required to create an Employee',
    }),

    potentialRole: Joi.array().items(
      Joi.string()
        .valid(RoleType.DEV, RoleType.PM, RoleType.QA, RoleType.TL, RoleType.UI_UX)
        .messages({
          'any.only': 'Potential role must be DEV, QA, UI_UX, PM or TL',
        }),
    ),
    notes: Joi.string().min(12).max(500).messages({
      'string.min': 'notes must not contain less than 12 characters',
      'string.max': 'notes must not contain more than 500 characters',
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
  createEmployee,
  editEmployee,
};
