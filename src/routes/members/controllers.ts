import { Request, Response } from 'express';

import MemberModel from 'src/models/members';
import { BodyResponse, MemberData } from 'src/types';

const getAllMembers = async (req: Request, res: Response<BodyResponse<MemberData[]>>) => {
  try {
    const allProjects = await MemberModel.find(req.body);

    if (allProjects.length) {
      return res.status(200).json({
        message: 'The list has been successfully retrieved',
        data: allProjects,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: 'Cannot show the list of Members.',
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

const getMemberById = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  try {
    const project = await MemberModel.findById(req.params.id);

    if (project) {
      return res.status(200).json({
        message: `User with ID ${req.params.id} has been found`,
        data: project,
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

export default { getAllMembers, getMemberById };
