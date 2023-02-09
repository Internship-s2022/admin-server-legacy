import { addDays, endOfDay } from 'date-fns';
import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import { CustomError } from 'src/helpers/customErrorModel';
import ClientModel from 'src/models/client';
import EmployeeModel from 'src/models/employee';
import NotificationsModel from 'src/models/notifications';
import ProjectModel from 'src/models/project';
import { BodyResponse, NotificationsData } from 'src/types';

const fieldsToPopulate = {
  employee: {
    path: 'employee',
    select: 'user',
    populate: {
      path: 'user',
      select: 'firstName lastName isActive',
    },
  },
  project: {
    path: 'project',
    select: 'projectName projectType isActive isCritic members',
    populate: {
      path: 'members',
      select: 'employee role startDate endDate memberDedication helper active',
      populate: {
        path: 'employee helper',
        select: 'user helperReference',
        populate: {
          path: 'user',
          select: 'firstName lastName',
        },
      },
    },
  },
  client: {
    path: 'client',
    select: 'name clientContact localContact isActive',
  },
};

const getAllNotifications = async (
  req: Request,
  res: Response<BodyResponse<NotificationsData[]>>,
) => {
  const allNotifications = await NotificationsModel.find(req.query).populate([
    { ...fieldsToPopulate.employee },
    { ...fieldsToPopulate.project },
    { ...fieldsToPopulate.client },
  ]);

  return res.status(200).json({
    message: `La lista de notificaciones fue obtenida con éxito ${
      !allNotifications.length && ', pero está vacía'
    }`,
    data: allNotifications,
    error: false,
  });
};

const getActiveNotifications = async (
  req: Request<unknown, unknown, unknown, { notice: number }>,
  res: Response<BodyResponse<NotificationsData[]>>,
) => {
  const { notice } = req.query;
  const allNotifications = await NotificationsModel.find({
    $or: [
      {
        $and: [
          { isCustom: true },
          {
            limitDate: {
              $lte: endOfDay(addDays(new Date(), notice)),
            },
          },
        ],
      },
      {
        isCustom: false,
      },
    ],
  }).populate([
    { ...fieldsToPopulate.employee },
    { ...fieldsToPopulate.project },
    { ...fieldsToPopulate.client },
  ]);

  return res.status(200).json({
    message: `La lista de notificaciones fue obtenida con éxito ${
      !allNotifications.length && ', pero está vacía'
    }`,
    data: allNotifications,
    error: false,
  });
};

const getNotificationById = async (
  req: Request,
  res: Response<BodyResponse<NotificationsData>>,
) => {
  const notification = await NotificationsModel.findById(req.params.id).populate([
    { ...fieldsToPopulate.employee },
    { ...fieldsToPopulate.project },
    { ...fieldsToPopulate.client },
  ]);

  if (!notification) {
    throw new CustomError(404, `No se encontró notificación con ID ${req.params.id}`);
  }

  return res.status(200).json({
    message: `Se ha encontrado notificación con ID ${req.params.id}`,
    data: notification,
    error: false,
  });
};

const createNotification = async (req: Request, res: Response<BodyResponse<NotificationsData>>) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const projectExists = req.body.project;
    const employeeExists = req.body.employee;
    const clientExists = req.body.client;

    if (projectExists?.length) {
      const project = await ProjectModel.findById(req.body.project);

      if (!project) {
        throw new CustomError(404, 'El proyecto no existe');
      }
    }

    if (employeeExists?.length) {
      const employee = await EmployeeModel.findById(req.body.employee);

      if (!employee) {
        throw new CustomError(404, 'El empleado no existe');
      }
    }

    if (clientExists?.length) {
      const client = await ClientModel.findById(req.body.client);

      if (!client) {
        throw new CustomError(404, 'Cliente no existe');
      }
    }

    const newNotification = new NotificationsModel({
      ...req.body,
      isChecked: true,
    });

    const notification = await newNotification.save({ session: session });

    session.commitTransaction();

    return res.status(201).json({
      message: 'Notificación creada exitosamente',
      data: notification,
      error: false,
    });
  } catch (error: any) {
    session.abortTransaction();
    throw new CustomError(500, error.message);
  }
};

const deleteNotification = async (req: Request, res: Response<BodyResponse<NotificationsData>>) => {
  const response = await NotificationsModel.findOneAndUpdate(
    { _id: req.params.id, isActive: true },
    { isActive: false },
    { new: true },
  );

  if (!response) {
    throw new CustomError(404, `No se encontró notificación con ID ${req.params.id}`);
  }

  return res.status(200).json({
    message: `Notificación con ID ${req.params.id} borrada exitosamente`,
    data: response,
    error: false,
  });
};

export default {
  getAllNotifications,
  getNotificationById,
  getActiveNotifications,
  createNotification,
  deleteNotification,
};
