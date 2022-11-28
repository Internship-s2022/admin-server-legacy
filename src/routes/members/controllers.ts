import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import EmployeeModel from 'src/models/employee';
import MemberModel from 'src/models/members';
import ProjectModel from 'src/models/project';
import { BodyResponse, MemberData } from 'src/types';

const getAllMembers = async (req: Request, res: Response<BodyResponse<MemberData[]>>) => {
  try {
    const allMembers = await MemberModel.find(req.query)
      .populate({
        path: 'employee',
        select: 'user',
        populate: {
          path: 'user',
          select: 'firstName lastName',
        },
      })
      .populate('project', 'projectName')
      .populate({
        path: 'helper',
        select: 'helperReference',
        populate: {
          path: 'helperReference',
          select: 'user',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        },
      });

    return res.status(200).json({
      message: 'The list has been successfully retrieved',
      data: allMembers,
      error: false,
    });
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
    const member = await MemberModel.findById(req.params.id).populate({
      path: 'helper',
      select: 'helperReference',
      populate: {
        path: 'helperReference',
        select: 'user',
        populate: {
          path: 'user',
          select: 'firstName lastName',
        },
      },
    });

    if (member) {
      return res.status(200).json({
        message: `Member with ID ${req.params.id} has been found`,
        data: member,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `Could not found a member by the id of ${req.params.id}.`,
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
    const projectExists = await ProjectModel.findById(req.body.project);
    const employeeExists = req.body.employee && (await EmployeeModel.findById(req.body.employee));

    if (!projectExists || (req.body.employee && !employeeExists)) {
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
      project: req.body.project,
      employee: req.body.employee,
    });
    let member: MemberData;
    if (!memberExists.length) {
      const newMember = new MemberModel({ ...req.body, active: true });
      member = await newMember.save({ session: session });
      await ProjectModel.findByIdAndUpdate(
        { _id: projectExists?._id },
        { $push: { members: [member._id] } },
        { new: true },
      ).session(session);
      await EmployeeModel.findByIdAndUpdate(
        { _id: employeeExists?._id },
        { $push: { projectHistory: [member._id] } },
        { new: true },
      ).session(session);
    } else {
      member = (await MemberModel.findByIdAndUpdate(
        { _id: memberExists[0]._id },
        { ...req.body, active: true },
        {
          new: true,
        },
      )) as MemberData;
    }

    session.commitTransaction();

    return res.status(201).json({
      message: 'Member created successfully',
      data: member,
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

const editMember = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  try {
    if (req.body.project || req.body.employee) {
      return res.status(400).json({
        message:
          req.body.project && req.body.employee
            ? 'Editing project and employee is not allowed'
            : `Editing ${req.body.project ? 'project' : 'employee'} is not allowed`,
        data: undefined,
        error: true,
      });
    }

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
