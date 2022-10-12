import { Request, Response } from 'express';

import { BodyResponse, EmployeeData } from 'src/interfaces';
import EmployeeModel from 'src/models/employee';

const getAllEmployees = async (req: Request, res: Response<BodyResponse<EmployeeData[]>>) => {
  try {
    const allEmployees = await EmployeeModel.find(req.body);

    if (allEmployees.length) {
      return res.status(200).json({
        message: 'The list has been successfully retrieved',
        data: allEmployees,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: 'Cannot show the list of Employees.',
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

const getEmployeeById = async (req: Request, res: Response<BodyResponse<EmployeeData>>) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    if (employee) {
      return res.status(200).json({
        message: `Employee with ID ${req.params.id} has been found`,
        data: employee,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `Could not found an employee by the id of ${req.params.id}.`,
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

const createEmployee = async (req: Request, res: Response<BodyResponse<EmployeeData>>) => {
  try {
    const newEmployee = new EmployeeModel(req.body);
    const successData = await newEmployee.save();
    return res.status(201).json({
      message: 'Employee created successfully',
      data: successData,
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

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
};
