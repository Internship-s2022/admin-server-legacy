import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { CriticalType, ProjectType } from './types';

const createProject = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    clientName: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'You have to use a valid name',
        'any.required': 'The client name is required',
        'string.min': 'The name must not contain less than 3 letters',
        'string.max': 'The name must not contain more than 35 letters',
      })
      .required(),

    projectName: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'You have to use a valid name',
        'any.required': 'The project name is required',
        'string.min': 'The name must not contain less than 3 letters',
        'string.max': 'The name must not contain more than 35 letters',
      })
      .required(),

    description: Joi.string()
      .min(12)
      .max(50)
      .messages({
        'string.base': 'You have to use a valid description',
        'any.required': 'The description is required',
        'string.min': 'The description must not contain less than 12 letters',
        'string.max': 'The description must not contain more than 50 letters',
      })
      .required(),

    notes: Joi.string().min(12).max(50).messages({
      'string.base': 'You have to use a valid name',
      'string.min': 'The name must not contain less than 12 letters',
      'string.max': 'The name must not contain more than 50 letters',
    }),

    startDate: Joi.date()
      .greater('now')
      .messages({
        'date.greater': 'Start date must be later than now',
      })
      .required(),

    endDate: Joi.date()
      .greater('now')
      .messages({
        'date.greater': 'Start date must be later than now',
      })
      .required(),

    members: Joi.array().items(Joi.string().alphanum().length(24)),

    isCritic: Joi.string()
      .valid(CriticalType.HIGH, CriticalType.MEDIUM, CriticalType.LOW)
      .messages({
        'any.only': 'Critical type must be one High, Medium, Low',
      }),

    isUpdated: Joi.boolean().required(),

    projectType: Joi.string()
      .valid(ProjectType.PROJECT_BUILDING, ProjectType.STAFF_AUMENTATION)
      .messages({
        'any.only': 'Project type must be one Project Building, Staff Aumentation',
      }),

    isActive: Joi.boolean().required(),
    'string.base': 'Status has to be a boolean',
    'any.required': 'You have to add a status to create an user ',
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

const editProject = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    clientName: Joi.string().min(3).max(35).messages({
      'string.base': 'You have to use a valid name',
      'any.required': 'The client name is required',
      'string.min': 'The name must not contain less than 3 letters',
      'string.max': 'The name must not contain more than 35 letters',
    }),

    projectName: Joi.string().min(3).max(35).messages({
      'string.base': 'You have to use a valid name',
      'any.required': 'The project name is required',
      'string.min': 'The name must not contain less than 3 letters',
      'string.max': 'The name must not contain more than 35 letters',
    }),

    description: Joi.string().min(12).max(50).messages({
      'string.base': 'You have to use a valid description',
      'any.required': 'The description is required',
      'string.min': 'The description must not contain less than 12 letters',
      'string.max': 'The description must not contain more than 50 letters',
    }),

    notes: Joi.string().min(12).max(50).messages({
      'string.base': 'You have to use a valid name',
      'string.min': 'The name must not contain less than 12 letters',
      'string.max': 'The name must not contain more than 50 letters',
    }),

    startDate: Joi.date().greater('now').messages({
      'date.greater': 'Start date must be later than now',
    }),
    endDate: Joi.date().greater('now').messages({
      'date.greater': 'Start date must be later than now',
    }),
    members: Joi.array().items(Joi.string().alphanum().length(24)),

    isCritic: Joi.string()
      .valid(CriticalType.HIGH, CriticalType.MEDIUM, CriticalType.LOW)
      .messages({
        'any.only': 'Critical type must be one High, Medium, Low',
      }),

    isUpdated: Joi.boolean(),

    projectType: Joi.string()
      .valid(ProjectType.PROJECT_BUILDING, ProjectType.STAFF_AUMENTATION)
      .messages({
        'any.only': 'Project type must be one Project Building, Staff Aumentation',
      }),

    isActive: Joi.boolean(),
    'string.base': 'Status has to be a boolean',
    'any.required': 'You have to add a status to create an user ',
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
  createProject,
  editProject,
};
