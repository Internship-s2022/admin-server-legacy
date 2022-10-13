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
      })
      .required(),

    ourContact: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'Our contact name must be a string',
        'string.min': 'Our contact name must contain more than 3 letters',
      })
      .required(),

    clientContact: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'Client contact name must be a string',
        'string.min': 'Client contact name must contain more than 3 letters',
      })
      .required(),

    projects: Joi.array().items(Joi.string().alphanum().length(24).required()).messages({
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

    isActive: Joi.boolean().required(),
    'boolean.base': 'Status has to be a boolean',
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
      'any.required': 'Name is a required field',
      'string.min': 'Name must not contain less than 3 letters',
    }),

    ourContact: Joi.string().min(3).max(35).messages({
      'string.base': 'Our contact name must be a string',
      'any.required': 'Our contact name is a required field',
      'string.min': 'Our contact name must contain more than 3 letters',
    }),

    clientContact: Joi.string().min(3).max(35).messages({
      'string.base': 'Client contact name must be a string',
      'string.min': 'Client contact name must contain more than 3 letters',
    }),

    projects: Joi.array().items(Joi.string().alphanum().length(24).required()).messages({
      'string.base': 'Project id must be a string',
      'string.length': 'Project id must have exactly 24 characters',
    }),

    relationshipStart: Joi.date().less('now').messages({
      'date.less': 'Relationship start date must be earlier than now',
      'any.required': 'Relationship start date is a required field',
    }),

    relationshipEnd: Joi.date().greater('now').messages({
      'date.greater': 'Relationship end date must be later than now',
      'any.required': 'Relationship end date is a required field',
    }),

    notes: Joi.string().min(3).max(35).messages({
      'string.base': 'Notes must be a string',
      'string.min': 'Notes must not contain less than 3 letters',
    }),

    isActive: Joi.boolean().messages({
      'boolean.base': 'Status has to be a boolean',
      'any.required': 'You have to add a status to create a client ',
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
