import { addDays, endOfDay } from 'date-fns';
import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import ClientModel from 'src/models/client';
import EmployeeModel from 'src/models/employee';
import NotificationsModel from 'src/models/notifications';
import ProjectModel from 'src/models/project';
import { BodyResponse, NotificationsData } from 'src/types';

const getAllNotifications = async (
  req: Request,
  res: Response<BodyResponse<NotificationsData[]>>,
) => {
  try {
    const allNotifications = await NotificationsModel.find(req.query)
      .populate({
        path: 'employee',
        select: 'user',
        populate: {
          path: 'user',
          select: 'firstName lastName isActive',
        },
      })
      .populate({
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
      })
      .populate('client', ['name', 'clientContact', 'localContact isActive']);
    if (!allNotifications.length) {
      return res.status(200).json({
        message: 'La lista de notificaciones fue obtenida con éxito',
        data: allNotifications,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'La lista de notificaciones fue obtenida con éxito, pero está vacía',
      data: allNotifications,
      error: false,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: 'Error',
      data: undefined,
      error: true,
    });
  }
};

const getActiveNotifications = async (
  req: Request<unknown, unknown, unknown, { notice: number }>,
  res: Response<BodyResponse<NotificationsData[]>>,
) => {
  try {
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
    })
      .populate({
        path: 'employee',
        select: 'user',
        populate: {
          path: 'user',
          select: 'firstName lastName isActive',
        },
      })
      .populate({
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
      })
      .populate('client', ['name', 'clientContact', 'localContact isActive']);

    return res.status(200).json({
      message: `La lista de notificaciones fue obtenida con éxito ${
        !allNotifications.length && ', pero está vacía'
      }`,
      data: allNotifications,
      error: false,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: 'Error',
      data: undefined,
      error: true,
    });
  }
};

const getNotificationById = async (
  req: Request,
  res: Response<BodyResponse<NotificationsData>>,
) => {
  try {
    const notification = await NotificationsModel.findById(req.params.id)
      .populate({
        path: 'employee',
        select: 'user',
        populate: {
          path: 'user',
          select: 'firstName lastName isActive',
        },
      })
      .populate({
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
      })
      .populate('client', ['name', 'clientContact', 'localContact isActive']);

    if (notification) {
      return res.status(200).json({
        message: `Se ha encontrado notificación con ID ${req.params.id}`,
        data: notification,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `No se encontró notificación con ID ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
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
        return res.status(404).json({
          message: 'Proyecto no existe',
          data: undefined,
          error: true,
        });
      }
    }

    if (employeeExists?.length) {
      const employee = await EmployeeModel.findById(req.body.employee);

      if (!employee) {
        return res.status(404).json({
          message: 'Empleado no existe',
          data: undefined,
          error: true,
        });
      }
    }

    if (clientExists?.length) {
      const client = await ClientModel.findById(req.body.client);

      if (!client) {
        return res.status(404).json({
          message: 'Cliente no existe',
          data: undefined,
          error: true,
        });
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
    return res.status(400).json({
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteNotification = async (req: Request, res: Response<BodyResponse<NotificationsData>>) => {
  try {
    const response = await NotificationsModel.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true },
    );

    if (!response) {
      return res.status(404).json({
        message: `No se encontró notificación con ID ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Notificación con ID ${req.params.id} borrada exitosamente`,
      data: response,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Ocurrió un error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllNotifications,
  getNotificationById,
  getActiveNotifications,
  createNotification,
  deleteNotification,
};
