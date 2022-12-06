import mongoose from 'mongoose';

import { AccessRoleType, UserData } from '../../../src/types';

const userList = [
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Samuel',
    lastName: 'Trillo',
    location: 'Rosario',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN15',
    email: 'samuel.trillo@radiumrocket.com',
    role: AccessRoleType.ADMIN,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Luciano',
    lastName: 'Alarcon',
    location: 'Rosario',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN16',
    email: 'luciano.alarcon@radiumrocket.com',
    role: AccessRoleType.ADMIN,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Juan Cruz',
    lastName: 'Moreira',
    location: 'Rosario',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN17',
    email: 'juancruz.moreira@radiumrocket.com',
    role: AccessRoleType.SUPER_ADMIN,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Paula',
    lastName: 'Rinaldi',
    location: 'Montevideo',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN18',
    email: 'paula.rinaldi@radiumrocket.com',
    role: AccessRoleType.SUPER_ADMIN,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Karen',
    lastName: 'Soto',
    location: 'Rosario',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN19',
    email: 'karen.soto@radiumrocket.com',
    role: AccessRoleType.ADMIN,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Coco',
    lastName: 'Lobos',
    location: 'Rosario',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'M5MCzG5aCKpf0B7qpNNsi8RyjZx3',
    email: 'nicolas.lobos@radiumrocket.com',
    role: AccessRoleType.ADMIN,
  },
  {
    _id: new mongoose.Types.ObjectId('6362924233e5dd0c870035a0'),
    firstName: 'Axel',
    lastName: 'Galindo',
    location: 'Rosario',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'wvOzFoI9U8bBuhBFUIAejnZNysW8',
    email: 'axel.galindo@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    _id: new mongoose.Types.ObjectId('6362af9489d8042257ae3d67'),
    firstName: 'Omari',
    lastName: 'Gomez',
    location: 'Rosario',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'wvOzFoI9U8bBuhBFUIAejnZNysW8',
    email: 'omari.gomez@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    _id: new mongoose.Types.ObjectId('636521b7f5e6dc3b6fa21fc2'),
    firstName: 'Roberto',
    lastName: 'Gonzalez',
    location: 'Buenos Aires',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'wvOzFoI9U8bBuhBFUIAejnZNysW8',
    email: 'roberto.gonzalez@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    _id: new mongoose.Types.ObjectId('63652237f744e1c979ccbdc7'),
    firstName: 'Agustin',
    lastName: 'Ruiz',
    location: 'Buenos Aires',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'wvOzFoI9U8bBuhBFUIAejnZNysW8',
    email: 'agustin.ruiz@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    _id: new mongoose.Types.ObjectId('636522bff744e1c979ccbdcc'),
    firstName: 'Agustin',
    lastName: 'Ruiz',
    location: 'Buenos Aires',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'wvOzFoI9U8bBuhBFUIAejnZNysW8',
    email: 'axel.galindo@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    _id: new mongoose.Types.ObjectId('636cffa3c3a6d46a4797b139'),
    firstName: 'Gerado',
    lastName: 'Fernandez',
    location: 'Buenos Aires',
    birthDate: new Date('1995-11-25T00:00:00Z'),
    isActive: true,
    firebaseUid: 'wvOzFoI9U8bBuhBFUIAejnZNysW8',
    email: 'axel.galindo@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
];

export default userList;
