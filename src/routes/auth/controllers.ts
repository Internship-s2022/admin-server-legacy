import { Request, Response } from 'express';

import { BodyResponse, UserData } from 'src/interfaces';
import UserModel from 'src/models/user';

const authenticateUser = async (req: Request, res: Response<BodyResponse<UserData>>) => {
  try {
    const authUser = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { firebaseUid: req.body.firebaseUid },
      {
        new: true,
      },
    );

    if (!authUser) {
      return res.status(200).json({
        message: 'User not found',
        data: undefined,
        error: true,
      });
    }
    const successData = await authUser?.save();

    return res.status(200).json({
      message: 'User account logged successfully',
      data: successData,
      error: false,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export default { authenticateUser };
