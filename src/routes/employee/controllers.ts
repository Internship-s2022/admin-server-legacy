import { Request, Response } from 'express';

import EmployeeModel from 'src/models/employee';
import { BodyResponse, EmployeeData } from 'src/types';

const getAllEmployees = async (req: Request, res: Response<BodyResponse<EmployeeData[]>>) => {
  try {
    const allEmployees: EmployeeData[] = await EmployeeModel.find(req.query)
      .populate('user', ['firstName', 'lastName', 'email', 'birthDate', 'isActive'])
      .populate({
        path: 'projectHistory',
        select: 'project role',
        populate: {
          path: 'project',
          select: 'projectName',
        },
      });

    return res.status(200).json({
      message: 'Lista de empleados obtenida correctamente',
      data: allEmployees,
      error: false,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: 'Error',
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req: Request, res: Response<BodyResponse<EmployeeData>>) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id)
      .populate('user', ['firstName', 'lastName', 'email', 'birthDate', 'isActive'])
      .populate({
        path: 'projectHistory',
        select: 'project role',
        populate: {
          path: 'project',
          select: 'projectName',
        },
      });

    if (employee) {
      return res.status(200).json({
        message: `Empleado con ID ${req.params.id} encontrado`,
        data: employee,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `No se pudo encontrar un empleado con ID ${req.params.id}.`,
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

const editEmployee = async (req: Request, res: Response<BodyResponse<EmployeeData>>) => {
  try {
    const response = await EmployeeModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!response) {
      return res.status(404).json({
        message: `No se pudo encontrar un empleado con ID ${req.params.id}.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Empleado con ID "${req.params.id}" actualizado`,
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

export default {
  getAllEmployees,
  getEmployeeById,
  editEmployee,
};
