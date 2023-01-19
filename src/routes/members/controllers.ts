import { Request, Response } from 'express';
import { startSession } from 'mongoose';

import { CustomError } from 'src/helpers/customErrorModel';
import EmployeeModel from 'src/models/employee';
import MemberModel from 'src/models/members';
import ProjectModel from 'src/models/project';
import { BodyResponse, MemberData } from 'src/types';

const fieldsToPopulate = {
  employee: {
    path: 'employee',
    select: 'user',
    populate: {
      path: 'user',
      select: 'firstName lastName',
    },
  },
  helper: {
    path: 'helper',
    select: 'helperReference isActive',
    populate: {
      path: 'helperReference',
      select: 'user',
      populate: {
        path: 'user',
        select: 'firstName lastName',
      },
    },
  },
  project: {
    path: 'project',
    select: 'projectName',
  },
};

const getAllMembers = async (req: Request, res: Response<BodyResponse<MemberData[]>>) => {
  const allMembers = await MemberModel.find(req.query).populate([
    { ...fieldsToPopulate.employee },
    { ...fieldsToPopulate.project },
    { ...fieldsToPopulate.helper },
  ]);

  return res.status(200).json({
    message: 'Lista de miembros obtenida correctamente',
    data: allMembers,
    error: false,
  });
};

const getMemberById = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  const member = await MemberModel.findById(req.params.id).populate([
    { ...fieldsToPopulate.employee },
    { ...fieldsToPopulate.project },
    { ...fieldsToPopulate.helper },
  ]);

  if (!member) {
    throw new CustomError(404, `No se encontró miembro con ID ${req.params.id}.`);
  }

  return res.status(200).json({
    message: `Se ha encontrado miembro con ID ${req.params.id}`,
    data: member,
    error: false,
  });
};

const createMember = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const projectExists = await ProjectModel.findById(req.body.project);
    const employeeExists = req.body.employee && (await EmployeeModel.findById(req.body.employee));

    if (!projectExists || (req.body.employee && !employeeExists)) {
      const customMessage =
        !projectExists && !employeeExists
          ? 'Empleado y proyecto inexistentes'
          : `El ${!projectExists ? 'Proyecto' : 'Empleado'} no existe`;

      throw new CustomError(404, customMessage);
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

    const populatedMember = await MemberModel.populate(member, [
      { ...fieldsToPopulate.employee },
      { ...fieldsToPopulate.project },
      { ...fieldsToPopulate.helper },
    ]);

    return res.status(201).json({
      message: 'Miembro creado exitosamente',
      data: populatedMember,
      error: false,
    });
  } catch (error: any) {
    session.abortTransaction();
    throw new CustomError(500, error.message);
  }
};

const editMember = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  if (req.body.project || req.body.employee) {
    const customMessage =
      req.body.project && req.body.employee
        ? 'Editar proyecto y empleado no esta permitido'
        : `Editar ${req.body.project ? 'proyecto' : 'empleado'} no está permitido`;

    throw new CustomError(400, customMessage);
  }

  const response = await MemberModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).populate([
    { ...fieldsToPopulate.employee },
    { ...fieldsToPopulate.project },
    { ...fieldsToPopulate.helper },
  ]);

  if (!response) {
    throw new CustomError(404, `No se encontró miembro con ID ${req.params.id}`);
  }

  return res.status(200).json({
    message: `Miembro con ID ${req.params.id} editado exitosamente`,
    data: response,
    error: false,
  });
};

const deleteMember = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  const response = await MemberModel.findOneAndUpdate(
    { _id: req.params.id, active: true },
    { active: false },
    { new: true },
  );

  if (!response) {
    throw new CustomError(404, `No se encontró miembro con ID ${req.params.id}`);
  }

  return res.status(200).json({
    message: `Miembro con ID ${req.params.id} eliminado exitosamente`,
    data: response,
    error: false,
  });
};

export default { getAllMembers, getMemberById, createMember, deleteMember, editMember };
