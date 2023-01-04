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
      message: 'Lista de miembros obtenida correctamente',
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
    const member = await MemberModel.findById(req.params.id)
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
        select: 'helperReference isActive',
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
        message: `se ha encontrado miembro con ID ${req.params.id}`,
        data: member,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `No se encontró miembro con ID ${req.params.id}.`,
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
            ? 'Empleado y proyecto inexistentes'
            : `El ${!projectExists ? 'Proyecto' : 'Empleado'} no existe`,
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

    const populatedMember = await MemberModel.populate(member, {
      path: 'employee',
      select: 'user',
      populate: {
        path: 'user',
        select: 'firstName lastName',
      },
    })
      .then((res) => res.populate('project', 'projectName'))
      .then((res) =>
        res.populate({
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
        }),
      );

    return res.status(201).json({
      message: 'Miembro creado exitosamente',
      data: populatedMember,
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
            ? 'Editar proyecto y empleado no esta permitido'
            : `Editar ${req.body.project ? 'proyectp' : 'empleado'} no está permitido`,
        data: undefined,
        error: true,
      });
    }

    const response = await MemberModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
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
        select: 'helperReference isActive',
        populate: {
          path: 'helperReference',
          select: 'user',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        },
      });

    if (!response) {
      return res.status(404).json({
        message: `No se encontró miembro con ID ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Miembro con ID ${req.params.id} editado exitosamente`,
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

const deleteMember = async (req: Request, res: Response<BodyResponse<MemberData>>) => {
  try {
    const response = await MemberModel.findOneAndUpdate(
      { _id: req.params.id, active: true },
      { active: false },
      { new: true },
    );
    if (!response) {
      return res.status(404).json({
        message: `No se encontró miembro con ID ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Miembro con ID ${req.params.id} eliminado exitosamente`,
      data: response,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Ocurrio un error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};
export default { getAllMembers, getMemberById, createMember, deleteMember, editMember };
