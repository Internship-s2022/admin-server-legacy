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
];

export interface FirebaseUsers {
  uid: string;
  email: string;
  role: AccessRoleType;
}

export default firebaseUsers;
