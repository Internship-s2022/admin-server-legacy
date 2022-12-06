import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import ClientModel from 'src/models/client';
import EmployeeModel from 'src/models/employee';
import NotificationsModel from 'src/models/notifications';
import ProjectModel from 'src/models/project';
import { BodyResponse, NotificationsData, NotificationType } from 'src/types';

const getAllNotifications = async (
  req: Request,
  res: Response<BodyResponse<NotificationsData[]>>,
) => {
  try {
    const allNotifications = await NotificationsModel.find(req.body);

    if (allNotifications.length) {
      return res.status(200).json({
        message: 'The list has been successfully retrieved',
        data: allNotifications,
        error: false,
      });
    }
  } catch (error: any) {
    return res.json({
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
    const notification = await NotificationsModel.findById(req.params.id);

    if (notification) {
      return res.status(200).json({
        message: `Notification with ID ${req.params.id} has been found`,
        data: notification,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `Could not found a Notification by the id of ${req.params.id}.`,
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
      if (req.body.notificationType !== NotificationType.PROJECT) {
        return res.status(400).json({
          message: 'The type of notification does not correspond with the data',
          data: undefined,
          error: true,
        });
      } else {
        const project = await ProjectModel.findById(req.body.project);

        if (!project) {
          return res.status(404).json({
            message: 'Project not found',
            data: undefined,
            error: true,
          });
        }
      }
    }

    if (employeeExists?.length) {
      if (req.body.notificationType !== NotificationType.EMPLOYEE) {
        return res.status(400).json({
          message: 'The type of notification does not correspond with the data',
          data: undefined,
          error: true,
        });
      } else {
        const employee = await EmployeeModel.findById(req.body.employee);

        if (!employee) {
          return res.status(404).json({
            message: 'Employee not found',
            data: undefined,
            error: true,
          });
        }
      }
    }

    if (clientExists?.length) {
      if (req.body.notificationType !== NotificationType.CLIENT) {
        return res.status(400).json({
          message: 'The type of notification does not correspond with the data',
          data: undefined,
          error: true,
        });
      } else {
        const client = await ClientModel.findById(req.body.client);

        if (!client) {
          return res.status(404).json({
            message: 'Client not found',
            data: undefined,
            error: true,
          });
        }
      }
    }

    const newNotification = new NotificationsModel({
      ...req.body,
      date: new Date(Date.now()),
      isChecked: true,
    });

    const notification = await newNotification.save({ session: session });

    session.commitTransaction();

    return res.status(201).json({
      message: 'Notification created successfully',
      data: notification,
      error: false,
    });
  } catch (error: any) {
    session.abortTransaction();
    return res.json({
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const editNotification = async (req: Request, res: Response<BodyResponse<NotificationsData>>) => {
  try {
    const response = await NotificationsModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!response) {
      return res.status(404).json({
        message: `Notification with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Notification with ID "${req.params.id}" updated successfully`,
      data: req.body,
      error: false,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: `An error has ocurred: ${error.message}`,
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
        message: `Notification with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Notification with ID "${req.params.id}" deleted successfully`,
      data: req.body,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error has ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllNotifications,
  getNotificationById,
  createNotification,
  editNotification,
  deleteNotification,
};
