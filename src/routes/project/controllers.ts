import { Request, Response } from 'express';

import { BodyResponse, ProjectData } from 'src/interfaces';
import ProjectModel from 'src/models/project';

const getAllProjects = async (req: Request, res: Response<BodyResponse<ProjectData[]>>) => {
  try {
    const allProjects = await ProjectModel.find(req.body);

    if (allProjects.length) {
      return res.status(200).json({
        message: 'The list has been successfully retrieved',
        data: allProjects,
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

const getProjectById = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
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

const createProject = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  try {
    const newProject = new ProjectModel(req.body);
    const project = await newProject.save();
    return res.status(201).json({
      message: 'Project created successfully',
      data: project,
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

export default { getAllProjects, getProjectById, createProject };
