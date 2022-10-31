import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { RoleType } from 'src/types';

const createMember = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    hasHelper: Joi.boolean().messages({
      'boolean.base': 'Value must be a boolean',
    }),
    helper: Joi.array().items(Joi.string()).messages({
      'string.base': 'Helper id must be a string',
    }),
    employee: Joi.string().messages({
      'string.base': 'Employee id must be a string',
    }),
    project: Joi.string().required().messages({
      'string.base': 'Project id must be a string',
      'any.required': 'Project id is required',
    }),
    role: Joi.string()
      .valid(RoleType.DEV, RoleType.PM, RoleType.QA, RoleType.TL, RoleType.UI_UX)
      .required()
      .messages({
        'any.only': 'Role must be DEV, PM, TL, QA, or UI_UX',
        'any.required': 'Role is required',
      }),
    dedication: Joi.number().messages({ 'any.only': 'Dedication must be a number' }),
    startDate: Joi.date().greater('now').messages({
      'date.greater': 'Start date must be later than now',
    }),
    endDate: Joi.date().greater('now').messages({
      'date.greater': 'Start date must be later than now',
    }),
    active: Joi.boolean().required().messages({
      'boolean.base': 'Status has to be a boolean',
      'any.required': 'Status is a required field',
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

const editMember = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    hasHelper: Joi.boolean().messages({
      'boolean.base': 'Value must be a boolean',
    }),
    helper: Joi.array().items(Joi.string()).messages({
      'string.base': 'Helper id must be a string',
    }),
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
