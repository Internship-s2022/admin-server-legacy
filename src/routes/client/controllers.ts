import { Request, Response } from 'express';

import { CustomError } from 'src/helpers/customErrorModel';
import ClientSchema from 'src/models/client';
import { BodyResponse, ClientData } from 'src/types';

const fieldsToPopulate = [
  'projectName',
  'description',
  'startDate',
  'endDate',
  'isCritic',
  'isActive',
];

const getAllClients = async (req: Request, res: Response<BodyResponse<ClientData[]>>) => {
  const allClients = await ClientSchema.find(req.query).populate('projects', fieldsToPopulate);

  return res.status(200).json({
    message: 'Lista de clientes obtenida con éxito',
    data: allClients,
    error: false,
  });
};

const getClientById = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  const client = await ClientSchema.findById(req.params.id).populate('projects', fieldsToPopulate);

  if (!client) {
    throw new CustomError(404, `No se encontró cliente con el ID ${req.params.id}.`);
  }
  return res.status(200).json({
    message: `Cliente con ID ${req.params.id} encontrado`,
    data: client,
    error: false,
  });
};

const clientExists = async (
  req: Request<unknown, unknown, unknown, { name: string }>,
  res: Response<BodyResponse<ClientData>>,
) => {
  const clientName = req.query.name;
  const clientNameList = await ClientSchema.find({
    name: new RegExp(`^${clientName}$`, 'i'),
  });

  if (clientNameList.length) {
    throw new CustomError(400, 'Este cliente ya existe');
  }

  return res.status(200).json({
    message: 'Cliente no existe',
    data: undefined,
    error: false,
  });
};

const createClient = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  const newClient = new ClientSchema(req.body);

  const clientName = await ClientSchema.findOne({ name: req.body.name });

  if (clientName) {
    throw new CustomError(400, 'Este cliente ya existe');
  }

  const successData = await newClient.save();

  return res.status(201).json({
    message: 'Cliente creado exitosamente',
    data: successData,
    error: false,
  });
};

const editClient = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  const response = await ClientSchema.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).populate('projects', fieldsToPopulate);

  if (!response) {
    throw new CustomError(404, `Cuenta del cliente con ID "${req.params.id}" no encontrada.`);
  }

  return res.status(200).json({
    message: `Cuenta del cliente con ID "${req.params.id}" actualizada`,
    data: response,
    error: false,
  });
};

const deleteClient = async (req: Request, res: Response<BodyResponse<ClientData>>) => {
  const response = await ClientSchema.findOneAndUpdate(
    { _id: req.params.id, isActive: true },
    { isActive: false },
    { new: true },
  );

  if (!response) {
    throw new CustomError(404, `Cuenta del cliente con ID "${req.params.id}" no encontrada.`);
  }

  return res.status(200).json({
    message: `Cliente con ID "${req.params.id}" eliminado exitosamente`,
    data: response,
    error: false,
  });
};

export default {
  getAllClients,
  getClientById,
  createClient,
  editClient,
  deleteClient,
  clientExists,
};
