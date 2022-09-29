import { AccessRoleType } from 'src/models/user';

export interface User {
  firebaseUid: string;
  accessRoleType: AccessRoleType;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  workedHours: number;
  isActive: boolean;
}
