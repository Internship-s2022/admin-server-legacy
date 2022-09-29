import { Request, Response } from 'express';

import user from 'src/models/user';

// GET method is only for example
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await user.find({});
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
};
