import { Request, Response } from 'express';

import { BodyResponse, ClientData } from 'src/interfaces';
import ClientSchema from 'src/models/client';

const getAllClients = async (req: Request, res: Response<BodyResponse<ClientData[]>>) => {
  try {
    const allClients = await ClientSchema.find(req.body).populate('projects');
    if (allClients.length) {
      return res.status(200).json({
        message: 'The list has been successfully retrieved',
        data: allClients,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: 'Cannot show the list of Clients.',
        data: undefined,
        error: true,
      });
    }
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
    const client = await ClientSchema.findById(req.params.id).populate('projects');

    if (client) {
      return res.status(200).json({
        message: `Client with ID ${req.params.id} has been found`,
        data: client,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: `Could not found an client by the id of ${req.params.id}.`,
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
    const successData = await newClient.save();

    return res.status(201).json({
      message: 'Client created successfully',
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
    });

    if (!response) {
      return res.status(404).json({
        message: `Client account with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Client account with ID "${req.params.id}" updated successfully`,
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

const deleteClient = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  try {
    const response = await ClientSchema.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true },
    );
    if (!response) {
      return res.status(404).json({
        message: `Client with ID "${req.params.id}" can not be found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Client with ID "${req.params.id}" deleted successfully`,
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

export default {
  getAllClients,
  getClientById,
  createClient,
  editClient,
  deleteClient,
};
