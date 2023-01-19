import { Request, Response } from 'express';

import { CustomError } from 'src/helpers/customErrorModel';
import EmployeeModel from 'src/models/employee';
import { BodyResponse, EmployeeData } from 'src/types';

const fieldsToPopulate = {
  user: ['firstName', 'lastName', 'email', 'birthDate', 'isActive'],
  projectHistory: {
    path: 'projectHistory',
    select: 'project role',
    populate: {
      path: 'project',
      select: 'projectName isActive',
    },
  },
};

const getAllEmployees = async (req: Request, res: Response<BodyResponse<EmployeeData[]>>) => {
  const allEmployees: EmployeeData[] = await EmployeeModel.find(req.query)
    .populate('user', fieldsToPopulate.user)
    .populate(fieldsToPopulate.projectHistory);

  return res.status(200).json({
    message: 'Lista de empleados obtenida correctamente',
    data: allEmployees,
    error: false,
  });
};

const getEmployeeById = async (req: Request, res: Response<BodyResponse<EmployeeData>>) => {
  const employee = await EmployeeModel.findById(req.params.id)
    .populate('user', fieldsToPopulate.user)
    .populate(fieldsToPopulate.projectHistory);

  if (!employee) {
    throw new CustomError(404, `No se encontró empleado con ID ${req.params.id}.`);
  }

  return res.status(200).json({
    message: `Empleado con ID ${req.params.id} encontrado`,
    data: employee,
    error: false,
  });
};

const editEmployee = async (req: Request, res: Response<BodyResponse<EmployeeData>>) => {
  const response = await EmployeeModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });

  if (!response) {
    throw new CustomError(404, `No se encontró empleado con ID ${req.params.id}.`);
  }

  return res.status(200).json({
    message: `Empleado con ID "${req.params.id}" actualizado`,
    data: response,
    error: false,
  });
};

export default {
  getAllEmployees,
  getEmployeeById,
  editEmployee,
};
