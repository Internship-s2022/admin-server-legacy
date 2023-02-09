import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import { CustomError } from 'src/helpers/customErrorModel';
import ClientModel from 'src/models/client';
import ProjectModel from 'src/models/project';
import { BodyResponse, ProjectData } from 'src/types';

import { Project } from './types';

const fieldsToPopulate = {
  client: {
    path: 'clientName',
    select: 'name',
  },
  members: {
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
  },
};

const getAllProjects = async (req: Request, res: Response<BodyResponse<ProjectData[]>>) => {
  const allProjects = await ProjectModel.find(req.query).populate([
    { ...fieldsToPopulate.client },
    { ...fieldsToPopulate.members },
  ]);

  return res.status(200).json({
    message: 'La lista de proyectos fue obtenida con éxito',
    data: allProjects,
    error: false,
  });
};

const getProjectById = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  const project = await ProjectModel.findById(req.params.id).populate([
    { ...fieldsToPopulate.client },
    { ...fieldsToPopulate.members },
  ]);

  if (!project) {
    throw new CustomError(404, `No se encontró proyecto con ID ${req.params.id}`);
  }
  return res.status(200).json({
    message: `Se ha encontrado proyecto con ID ${req.params.id}`,
    data: project,
    error: false,
  });
};

const createProject = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const clientExist = await ClientModel.findById(req.body.clientName);
    if (!clientExist) {
      throw new CustomError(404, 'El cliente no fue encontrado');
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
    throw new CustomError(500, error.message);
  }
};

const editProject = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  const response = await ProjectModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).populate([{ ...fieldsToPopulate.client }, { ...fieldsToPopulate.members }]);

  if (!response) {
    throw new CustomError(404, `No se encontró proyecto con ID ${req.params.id}`);
  }

  return res.status(200).json({
    message: `Proyecto con ID ${req.params.id} editado exitosamente`,
    data: response,
    error: false,
  });
};

const deleteProject = async (req: Request, res: Response<BodyResponse<ProjectData>>) => {
  const selectedProject: Project | null = await ProjectModel.findOne({
    _id: req.params.id,
  }).populate('members', 'active');

  const hasMembers = selectedProject?.members?.some((member) => member?.active);

  if (hasMembers) {
    throw new CustomError(
      400,
      `No se puede desactivar el proyecto con ID ${req.params.id} porque tiene miembros activos`,
    );
  }

  const response = await ProjectModel.findOneAndUpdate(
    { _id: req.params.id, isActive: true },
    { isActive: false },
    { new: true },
  );

  if (!response) {
    throw new CustomError(404, `No se encontró proyecto con ID ${req.params.id}`);
  }

  return res.status(200).json({
    message: `Proyecto con ID ${req.params.id} desactivado exitosamente`,
    data: response,
    error: false,
  });
};

export default { getAllProjects, getProjectById, createProject, editProject, deleteProject };
