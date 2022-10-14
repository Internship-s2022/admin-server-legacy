import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import { BodyResponse, UserData } from 'src/interfaces';
import EmployeeModel from 'src/models/employee';
import UserModel from 'src/models/user';

import { AccessRoleType } from './types';

const getAllUsers = async (req: Request, res: Response<BodyResponse<UserData[]>>) => {
  try {
    const allUsers = await UserModel.find(req.body);
    if (allUsers.length) {
      return res.status(200).json({
        message: 'The list has been successfully retrieved',
        data: allUsers,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: 'Cannot show the list of Users.',
        data: undefined,
        error: true,
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

const getUserById = async (req: Request, res: Response<BodyResponse<UserData>>) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (user) {
      return res.status(200).json({
        message: `User with ID ${req.params.id} has been found`,
        data: user,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `Could not found an user by the id of ${req.params.id}.`,
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

const createUser = async (req: Request, res: Response<BodyResponse<UserData>>) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const isUsed = await UserModel.findOne({ email: req.body.email });

    if (isUsed) {
      return res.status(400).json({
        message: 'This user has already been registered',
        data: undefined,
        error: true,
      });
    }

    const newUser = new UserModel(req.body);
    const successData = await newUser.save({ session: session });

    if (successData.accessRoleType === 'EMPLOYEE') {
      const employeeBody = {
        user: successData._id,
      };
      const newEmployee = new EmployeeModel(employeeBody);
      await newEmployee.save();
    }

    session.commitTransaction();

    return res.status(201).json({
      message: 'User created successfully',
      data: successData,
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

const editUser = async (req: Request, res: Response<BodyResponse<UserData>>) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const response = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    }).session(session);
    const employeeFound = await EmployeeModel.findOne({ user: req.params.id });

    if (!employeeFound && req.body.accessRoleType === 'EMPLOYEE') {
      const employeeBody = {
        user: req.params.id,
      };
      const newEmployee = new EmployeeModel(employeeBody);
      await newEmployee.save();
    }

    session.commitTransaction();

    if (!response) {
      return res.status(404).json({
        message: `User account with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `User account with ID "${req.params.id}" updated successfully`,
      data: req.body,
      error: false,
    });
  } catch (error: any) {
    session.abortTransaction();
    return res.status(400).json({
      message: `An error has ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteUser = async (req: Request, res: Response<BodyResponse<UserData>>) => {
  try {
    //to do: check if user is related to an employee that is active as member in project.
    const response = await UserModel.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true },
    );
    if (!response) {
      return res.status(404).json({
        message: `User account with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `User account with ID "${req.params.id}" deleted successfully`,
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
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};
