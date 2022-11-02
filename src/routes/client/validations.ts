import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createClient = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must not contain less than 3 letters',
        'any.required': 'Name is a required field',
      })
      .required(),

    localContact: Joi.object({
      name: Joi.string().min(3).max(35).messages({
        'string.base': 'Our local contact name must be a string',
        'string.min': 'Our local contact name must contain more than 3 letters',
      }),
      email: Joi.string()
        .regex(/^[a-zA-Z.]+@radiumrocket.com/)
        .min(20)
        .messages({
          'string.pattern.base': 'Email is not valid',
          'any.required': 'Email is required to create client',
          'string.min': 'Email must contain at least 3 characters',
        }),
    }).required(),

    clientContact: Joi.object({
      name: Joi.string().min(3).max(35).messages({
        'string.base': 'Our local contact name must be a string',
        'string.min': 'Our local contact name must contain more than 3 letters',
      }),
      email: Joi.string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .messages({
          'string.pattern.base': 'Email is not valid',
          'any.required': 'Email is required to create client',
          'string.min': 'Email must contain at least 3 characters',
        }),
    }).required(),

    projects: Joi.array().items(Joi.string().alphanum().length(24)).messages({
      'string.base': 'Project id must be a string',
      'string.length': 'Project id must have exactly 24 characters',
    }),

    relationshipStart: Joi.date().less('now').messages({
      'date.less': 'Relationship start date must be earlier than now',
    }),

    relationshipEnd: Joi.date().greater('now').messages({
      'date.greater': 'Relationship end date must be later than now',
    }),

    notes: Joi.string().min(3).max(35).messages({
      'string.base': 'Notes must be a string',
      'string.min': 'Notes must not contain less than 3 letters',
    }),

    isActive: Joi.boolean()
      .messages({
        'boolean.base': 'Status has to be a boolean',
        'any.required': 'Client status is a required field',
      })
      .required(),
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

const updateClient = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(35).messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must not contain less than 3 letters',
    }),

    localContact: Joi.object({
      name: Joi.string().min(3).max(35).messages({
        'string.base': 'Our local contact name must be a string',
        'string.min': 'Our local contact name must contain more than 3 letters',
      }),
      email: Joi.string()
        .regex(/^[a-zA-Z.]+@radiumrocket.com/)
        .min(20)
        .messages({
          'string.pattern.base': 'Email is not valid',
          'string.empty': 'Email is required to create client',
          'string.min': 'Email must contain at least 3 characters',
        }),
    }),

    clientContact: Joi.object({
      name: Joi.string().min(3).max(35).messages({
        'string.base': 'Our local contact name must be a string',
        'string.min': 'Our local contact name must contain more than 3 letters',
      }),
      email: Joi.string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .messages({
          'string.pattern.base': 'Email is not valid',
          'string.empty': 'Email is required to create client',
        }),
    }),

    projects: Joi.array().items(Joi.string().alphanum().length(24)).messages({
      'string.base': 'Project id must be a string',
      'string.length': 'Project id must have exactly 24 characters',
    }),

    relationshipStart: Joi.date().less('now').messages({
      'date.less': 'Relationship start date must be earlier than now',
    }),

    relationshipEnd: Joi.date().greater('now').messages({
      'date.greater': 'Relationship end date must be later than now',
    }),

    notes: Joi.string().min(3).max(35).messages({
      'string.base': 'Notes must be a string',
      'string.min': 'Notes must not contain less than 3 letters',
    }),

    isActive: Joi.boolean().messages({
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
  createClient,
  updateClient,
};
