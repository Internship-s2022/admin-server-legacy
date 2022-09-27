import { Request, Response } from 'express';
import fs from 'fs';

import users from '../../data/users';

// GET method is only for example
const getAllUsers = (req: Request, res: Response) => {
  try {
    const allUsers = users.filter((user) => user.isActive);
    if (allUsers.length > 0) {
      return res.status(200).json({
        message: 'Showing Users.',
        data: allUsers,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Cannot show the list of Users.',
      data: undefined,
      error: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Something went wrong: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

// TODO CONTROLLER GET-GETBY-POST-PUT

const deleteUser = (req: Request, res: Response) => {
  try {
    const user = users.find((user) => user.firebaseUid === req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        data: undefined,
        error: true,
      });
    }
    const newUsers = users.filter((user) => user.firebaseUid !== req.params.id);
    const editedUser = {
      ...user,
      isActive: false,
    };
    newUsers.push(editedUser);
    fs.writeFile('src/data/users.json', JSON.stringify(newUsers), (err) => {
      if (err) {
        return res.status(500).json({
          message: `Something went wrong: ${err.message}`,
          data: undefined,
          error: true,
        });
      } else {
        return res.status(200).json({
          message: 'User deleted',
          data: editedUser,
          error: false,
        });
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllUsers,
  // getUserById,
  // createUser,
  // editUser,
  deleteUser,
};
