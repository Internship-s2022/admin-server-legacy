import { Request, Response } from 'express';

import { BodyResponse, ClientData } from 'src/interfaces';
import ClientSchema from 'src/models/client';

const getAllClients = async (req: Request, res: Response<BodyResponse<ClientData[]>>) => {
  try {
    const allClients = await ClientSchema.find(req.body);
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
      message: 'Error',
      data: undefined,
      error: true,
    });
  }
};

const getClientById = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  try {
    const clientId = await ClientSchema.findById(req.params.id);
    if (clientId) {
      return res.status(200).json({
        message: `Client with ID ${req.params.id} has been found`,
        data: clientId,
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

export default {
  getAllClients,
  getClientById,
};
