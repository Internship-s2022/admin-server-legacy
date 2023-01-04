import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import ClientModel from 'src/models/client';
import ProjectModel from 'src/models/project';
import { BodyResponse, ProjectData } from 'src/types';

const getAllProjects = async (req: Request, res: Response<BodyResponse<ProjectData[]>>) => {
  try {
    const allProjects = await ProjectModel.find(req.query)
      .populate('clientName', ['name'])
      .populate({
        path: 'members',
        select: 'employee role startDate endDate memberDedication helper active',
        populate: {
          path: 'employee helper',
          select: 'user helperReference',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        },
      });

    return res.status(200).json({
      message: 'La lista de proyectos fue obtenida con éxito',
      data: allProjects,
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

const getProjectById = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  try {
    const project = await ProjectModel.findById(req.params.id)
      .populate('clientName', ['name'])
      .populate({
        path: 'members',
        select: 'employee role startDate endDate memberDedication helper active',
        populate: {
          path: 'employee helper',
          select: 'user helperReference',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        },
      });

    if (project) {
      return res.status(200).json({
        message: `Se ha encontrado proyecto con ID ${req.params.id}`,
        data: project,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `No se encontró proyecto con ID ${req.params.id}`,
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
        message: 'El cliente no fue encontrado',
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
      message: 'Proyecto creado exitosamente',
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
    })
      .populate('clientName', ['name'])
      .populate({
        path: 'members',
        select: 'employee role startDate endDate memberDedication helper active',
        populate: {
          path: 'employee helper',
          select: 'user helperReference',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        },
      });

    if (!response) {
      return res.status(404).json({
        message: `No se encontró proyecto con ID ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Proyecto con ID ${req.params.id} editado exitosamente`,
      data: response,
      error: false,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: `Ocurrió un error: ${error.message}`,
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
        message: `No se encontró proyecto con ID ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Proyecto con ID ${req.params.id} desactivado exitosamente`,
      data: response,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Ocurrió un error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default { getAllProjects, getProjectById, createProject, editProject, deleteProject };
