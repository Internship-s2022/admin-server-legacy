import { Request, Response } from 'express';

import ClientSchema from 'src/models/client';
import { BodyResponse, ClientData } from 'src/types';

const getAllClients = async (req: Request, res: Response<BodyResponse<ClientData[]>>) => {
  try {
    const allClients = await ClientSchema.find(req.query).populate('projects', [
      'projectName',
      'description',
      'startDate',
      'endDate',
      'isCritic',
      'isActive',
    ]);

    return res.status(200).json({
      message: 'Lista de clientes obtenida con éxito',
      data: allClients,
      error: false,
    });
  } catch (error: any) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getClientById = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  try {
    const client = await ClientSchema.findById(req.params.id).populate('projects', [
      'projectName',
      'description',
      'startDate',
      'endDate',
      'isCritic',
      'isActive',
    ]);

    if (client) {
      return res.status(200).json({
        message: `Cliente con ID ${req.params.id} encontrado`,
        data: client,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `No se encontró cliente con el ID ${req.params.id}.`,
        data: undefined,
        error: true,
      });
    }
  } catch (error: any) {
    return res.json({
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const createClient = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  try {
    const newClient = new ClientSchema(req.body);

    const clientName = await ClientSchema.findOne({ name: req.body.name });

    if (clientName) {
      return res.status(400).json({
        message: 'Este cliente ya existe',
        data: undefined,
        error: true,
      });
    }

    const successData = await newClient.save();

    return res.status(201).json({
      message: 'Cliente creado exitosamente',
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

const editClient = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  try {
    const response = await ClientSchema.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    }).populate('projects', [
      'projectName',
      'description',
      'startDate',
      'endDate',
      'isCritic',
      'isActive',
    ]);

    if (!response) {
      return res.status(404).json({
        message: `Cuenta del cliente con ID "${req.params.id}" no encontrada.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Cuenta del cliente con ID "${req.params.id}" actualizada`,
      data: response,
      error: false,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: `Ha ocurrido un error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteClient = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  try {
    const response = await ClientSchema.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true },
    );

    if (!response) {
      return res.status(404).json({
        message: `Cliente con ID "${req.params.id}" no fue encontrado.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Cliente con ID "${req.params.id}" eliminado exitosamente`,
      data: response,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Ha ocurrido un error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllClients,
  getClientById,
  createClient,
  editClient,
  deleteClient,
};
