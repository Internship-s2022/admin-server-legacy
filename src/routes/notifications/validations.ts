import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { NotificationType } from 'src/types';

const createNotification = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    notificationType: Joi.string()
      .valid(NotificationType.CLIENT, NotificationType.EMPLOYEE, NotificationType.PROJECT)
      .messages({
        'any.only': 'La notificación debe ser de tipo "Empleado", "Cliente" o "Proyecto"',
        'any.required': 'El tipo de notificación es requerido',
      })
      .required(),
    employee: Joi.string().messages({
      'string.base': 'El id del empleado debe ser un string',
    }),
    project: Joi.string().messages({
      'string.base': 'El id del proyecto debe ser un string',
    }),
    client: Joi.string().messages({
      'string.base': 'El id del cliente debe ser un string',
    }),
    reasonType: Joi.number(),
    customMessage: Joi.string().min(3).max(25).messages({
      'string.min': 'El mensaje debe contener al menos 3 caracteres',
      'string.max': 'El mensaje debe contener menos de 25 caracteres',
    }),
    isActive: Joi.boolean()
      .messages({
        'string.base': 'El estado de la notificacion debe ser un boolean',
        'string.empty': 'El estado de la notificacion debe estar cargado para crearla',
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

const editNotification = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    notificationType: Joi.string()
      .valid(NotificationType.CLIENT, NotificationType.EMPLOYEE, NotificationType.PROJECT)
      .messages({
        'any.only': 'La notificación debe ser de tipo "Empleado", "Cliente" o "Proyecto"',
        'any.required': 'El tipo de notificación es requerido',
      }),
    employee: Joi.string().messages({
      'string.base': 'El id del empleado debe ser un string',
    }),
    project: Joi.string().messages({
      'string.base': 'El id del proyecto debe ser un string',
    }),
    client: Joi.string().messages({
      'string.base': 'El id del cliente debe ser un string',
    }),
    date: Joi.date(),
    reasonType: Joi.number(),
    customMessage: Joi.string().min(3).max(50).messages({
      'string.min': 'El mensaje debe contener al menos 3 caracteres',
      'string.max': 'El mensaje debe contener menos de 25 caracteres',
    }),
    isActive: Joi.boolean().messages({
      'string.base': 'El estado de la notificacion debe ser un boolean',
      'string.empty': 'El estado de la notificacion debe estar cargado para crearla',
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

export default { createNotification, editNotification };
