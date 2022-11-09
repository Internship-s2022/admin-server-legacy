import { AccessRoleType } from 'src/types';
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
