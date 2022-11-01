import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { RoleType } from 'src/types';

const createMember = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    hasHelper: Joi.boolean().messages({
      'boolean.base': 'Value must be a boolean',
    }),
    helper: Joi.array().items(
      Joi.object({
        helperReference: Joi.string().alphanum().length(24).messages({
          'string.base': 'Helper Reference must be a string',
          'string.length': 'Helper Reference must be exactly 24 characters',
        }),
        dependency: Joi.number().min(1).max(100).messages({
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
    helper: Joi.array().items(
      Joi.object({
        helperReference: Joi.string().alphanum().length(24).messages({
          'string.base': 'Helper Reference must be a string',
          'string.length': 'Helper Reference must be exactly 24 characters',
        }),
        dependency: Joi.number().min(1).max(100).messages({
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
