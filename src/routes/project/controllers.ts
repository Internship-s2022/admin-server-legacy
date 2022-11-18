import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import ClientModel from 'src/models/client';
import ProjectModel from 'src/models/project';
import { BodyResponse, ProjectData } from 'src/types';

const getAllProjects = async (req: Request, res: Response<BodyResponse<ProjectData[]>>) => {
  try {
    const allProjects = await ProjectModel.find(req.body)
      .populate('clientName', ['name'])
      .populate({
        path: 'members',
        select: 'employee role startDate endDate memberDedication helper',
        populate: {
          path: 'employee helper',
          select: 'user helperReference',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        },
      });

    if (allProjects.length) {
      return res.status(200).json({
        message: 'The list has been successfully retrieved',
        data: allProjects,
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

const getProjectById = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  try {
    const project = await ProjectModel.findById(req.params.id)
      .populate('clientName', ['name'])
      .populate({
        path: 'members',
        select: 'employee role startDate endDate memberDedication helper',
        populate: {
          path: 'employee helper',
          select: 'user helperReference',
          populate: {
            path: 'user',
            select: 'firstName lastName',
            // populate: {
            //   path: 'employee',
            //   select: 'user',
            //   populate: {
            //     path: 'user',
            //     select: 'firstName lastName',
            //   },
            // },
          },
        },
      });
    // .populate({
    //   path: 'members',
    //   select: 'helper',
    //   populate: {
    //     path: 'helper',
    //     select: 'helperReference',
    //     populate: {
    //       path: 'helperReference',
    //       select: 'user',
    //       populate: {
    //         path: 'user',
    //         select: 'firstName lastName',
    //       },
    //     },
    //   },
    // });

    if (project) {
      return res.status(200).json({
        message: `Project with ID ${req.params.id} has been found`,
        data: project,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `Could not found a Project by the id of ${req.params.id}.`,
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

const createProject = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const clientExist = await ClientModel.findById(req.body.clientName);
    if (!clientExist) {
      return res.status(404).json({
        message: 'The client was not found',
        data: undefined,
        error: true,
      });
    }

    const newProject = new ProjectModel({ ...req.body, isActive: true, isUpdated: false });

    const project = await newProject.save({ session: session });

    await ClientModel.findByIdAndUpdate(
      { _id: clientExist._id },
      { $push: { projects: [project._id] } },
      { new: true },
    ).session(session);

    session.commitTransaction();

    return res.status(201).json({
      message: 'Project created successfully',
      data: project,
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

const editProject = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  try {
    const response = await ProjectModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!response) {
      return res.status(404).json({
        message: `Project with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Project with ID "${req.params.id}" updated successfully`,
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

const deleteProject = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  try {
    const response = await ProjectModel.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true },
    );

    if (!response) {
      return res.status(404).json({
        message: `Project with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Project with ID "${req.params.id}" deleted successfully`,
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

export default { getAllProjects, getProjectById, createProject, editProject, deleteProject };
