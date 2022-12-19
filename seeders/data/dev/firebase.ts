import { AccessRoleType } from '../../../src/types';

const firebaseUsers = [
  {
    uid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN15',
    email: 'samuel.trillo@radiumrocket.com',
    role: AccessRoleType.ADMIN,
  },
  {
    uid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN16',
    email: 'luciano.alarcon@radiumrocket.com',
    role: AccessRoleType.ADMIN,
  },
  {
    uid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN17',
    email: 'juancruz.moreira@radiumrocket.com',
    role: AccessRoleType.SUPER_ADMIN,
  },
  {
    uid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN18',
    email: 'paula.rinaldi@radiumrocket.com',
    role: AccessRoleType.SUPER_ADMIN,
  },
  {
    uid: 'M5MCzG5aCKpf0B7qpNNsi8RyjN19',
    email: 'karen.soto@radiumrocket.com',
    role: AccessRoleType.ADMIN,
  },
  {
    uid: 'M5MCzG5aCKpf0B7qpNNsi8RyjZx3',
    email: 'nicolas.lobos@radiumrocket.com',
    role: AccessRoleType.ADMIN,
  },
  {
    uid: 'wvOzFoI9U8bBuhBFUIAejnZNysW8',
    email: 'axel.galindo@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    uid: '0G08Itx6V9YIALCtKWRP0XSQATF3',
    email: 'omari.gomez@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    uid: 'v7lwPV3W1GbD2ThZM0cM9dSsr0u2',
    email: 'roberto.gozalez@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    uid: 'n8ud7ACr1TOiwJ3oenxEQNR1GtF3',
    email: 'agustin.ruiz@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
  {
    uid: 'eBVh8uLL6KZSRdkG85pKHgfYJsg1',
    email: 'gerardo.fernandez@radiumrocket.com',
    role: AccessRoleType.EMPLOYEE,
  },
];

export interface FirebaseUsers {
  uid: string;
  email: string;
  role: AccessRoleType;
}

export default firebaseUsers;
