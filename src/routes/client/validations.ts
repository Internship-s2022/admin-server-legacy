import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createClient = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(35)
      .trim()
      .messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre debe tener máximo 35 caracteres',
        'string.empty': 'Este campo es requerido',
      })
      .required(),

    localContact: Joi.object({
      name: Joi.string()
        .min(3)
        .max(35)
        .regex(/^[a-zA-Z\s]*$/)
        .trim()
        .messages({
          'string.min': 'El nombre debe contener al menos 3 letras',
          'string.empty': 'Este campo es requerido',
          'string.max': 'El nombre debe tener máximo 35 letras',
          'string.pattern.base': 'El nombre debe contener solo letras',
        })
        .required(),
      email: Joi.string()
        .regex(/^[a-zA-Z]+\.+[a-zA-Z]+@(radiumrocket.com)$/)
        .min(20)
        .trim()
        .messages({
          'string.empty': 'Este campo es requerido',
          'string.min': 'El email debe contener al menos 3 letras',
          'string.pattern.base': 'Formato de email no es válido',
        })
        .required(),
    }),

    clientContact: Joi.object({
      name: Joi.string()
        .min(3)
        .max(35)
        .regex(/^[a-zA-Z\s]*$/)
        .trim()
        .messages({
          'string.min': 'El nombre debe contener al menos 3 letras',
          'string.empty': 'Este campo es requerido',
          'string.max': 'El nombre debe tener máximo 35 letras',
          'string.pattern.base': 'El nombre debe contener solo letras',
        })
        .required(),
      email: Joi.string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .trim()
        .messages({
          'string.empty': 'Este campo es requerido',
          'string.min': 'El email debe contener al menos 3 letras',
          'string.pattern.base': 'Formato de email no es válido',
        })
        .required(),
    }),

    relationshipStart: Joi.date()
      .less('now')
      .messages({
        'date.less': 'Fecha de inicio debe ser anterior a la fecha actual',
      })
      .allow(null),

    relationshipEnd: Joi.date()
      .greater(Joi.ref('relationshipStart'))
      .messages({
        'date.greater': 'Fecha de fin debe ser posterior a la fecha de inicio',
      })
      .allow(null),

    isActive: Joi.boolean()
      .messages({
        'boolean.base': 'El status tiene que ser un booleano',
        'any.required': 'Este campo es requerido',
      })
      .required(),
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

const updateClient = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(35).trim().messages({
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.max': 'El nombre debe tener máximo 35 caracteres',
      'string.empty': 'Este campo es requerido',
    }),

    localContact: Joi.object({
      name: Joi.string()
        .min(3)
        .max(35)
        .regex(/^[a-zA-Z\s]*$/)
        .trim()
        .messages({
          'string.min': 'El nombre debe contener al menos 3 letras',
          'string.empty': 'Este campo es requerido',
          'string.max': 'El nombre debe tener máximo 35 letras',
          'string.pattern.base': 'El nombre debe contener solo letras',
        }),

      email: Joi.string()
        .regex(/^[a-zA-Z]+\.+[a-zA-Z]+@(radiumrocket.com)$/)
        .min(20)
        .trim()
        .messages({
          'string.empty': 'Este campo es requerido',
          'string.min': 'El email debe contener al menos 3 letras',
          'string.pattern.base': 'Formato de email no es válido',
        }),
    }),

    clientContact: Joi.object({
      name: Joi.string()
        .min(3)
        .max(35)
        .regex(/^[a-zA-Z\s]*$/)
        .trim()
        .messages({
          'string.min': 'El nombre debe contener al menos 3 letras',
          'string.empty': 'Este campo es requerido',
          'string.max': 'El nombre debe tener máximo 35 letras',
          'string.pattern.base': 'El nombre debe contener solo letras',
        }),
      email: Joi.string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .trim()
        .messages({
          'string.empty': 'Este campo es requerido',
          'string.min': 'El email debe contener al menos 3 letras',
          'string.pattern.base': 'Formato de email no es válido',
        }),
    }),

    relationshipStart: Joi.date()
      .less('now')
      .messages({
        'date.less': 'La fecha de inicio debe ser anterior a la fecha actual',
      })
      .allow(null),

    relationshipEnd: Joi.date()
      .greater(Joi.ref('relationshipStart'))
      .messages({
        'date.greater': 'Fecha de fin debe ser posterior a la fecha de inicio',
      })
      .allow(null),

    isActive: Joi.boolean().messages({
      'boolean.base': 'El status tiene que ser un booleano',
      'any.required': 'Este campo es requerido',
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
  createClient,
  updateClient,
};
