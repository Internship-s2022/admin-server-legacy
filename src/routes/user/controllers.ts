import { Request, Response } from 'express';

import { BodyResponse, UserData } from 'src/interfaces';

import UserModel from '../../models/user';

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
    const userId = await UserModel.findById(req.params.id);
    if (userId) {
      return res.status(200).json({
        message: `User with ID ${req.params.id} has been found`,
        data: userId,
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
    return res.json({
      message: 'Error',
      data: undefined,
      error: true,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(response);
    if (!response) {
      return res.status(404).json({
        message: `User account with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `User account with ID "${req.params.id}" deleted succesfully`,
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
  deleteUser,
  getUserById,
};
