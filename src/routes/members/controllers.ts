import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import EmployeeModel from 'src/models/employee';
import MemberModel from 'src/models/members';
import ProjectModel from 'src/models/project';
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

const createMember = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const projectExists = await ProjectModel.findById(req.body.projectId);
    const employeeExists =
      req.body.employeeId && (await EmployeeModel.findById(req.body.employeeId));

    if (!projectExists || (req.body.employeeId && !employeeExists)) {
      return res.status(404).json({
        message:
          !projectExists && !employeeExists
            ? 'Employee and Project do not exist'
            : `The ${!projectExists ? 'Project' : 'Employee'} does not exist`,
        data: undefined,
        error: true,
      });
    }

    const memberExists = await MemberModel.find({
      projectId: req.body.projectId,
      employeeId: req.body.employeeId,
    });
    let member: MemberData;
    if (!memberExists.length) {
      const newMember = new MemberModel({ ...req.body, active: true });
      member = await newMember.save();
      await ProjectModel.findByIdAndUpdate(
        { _id: projectExists?._id },
        { $push: { members: [member._id] } },
        { new: true },
      );
    } else {
      member = (await MemberModel.findByIdAndUpdate(
        { _id: memberExists[0]._id },
        { ...req.body, active: true },
        {
          new: true,
        },
      )) as MemberData;
    }
    return res.status(201).json({
      message: 'Member created successfully',
      data: member,
      error: false,
    });
  } catch (error: any) {
    return res.json({
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const editMember = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  try {
    const response = await MemberModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!response) {
      return res.status(404).json({
        message: `Member with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Member with ID "${req.params.id}" updated successfully`,
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

const deleteMember = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  try {
    const response = await MemberModel.findOneAndUpdate(
      { _id: req.params.id, active: true },
      { active: false },
      { new: true },
    );
    if (!response) {
      return res.status(404).json({
        message: `Member with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Member with ID "${req.params.id}" deleted successfully`,
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
export default { getAllMembers, getMemberById, createMember, deleteMember, editMember };
