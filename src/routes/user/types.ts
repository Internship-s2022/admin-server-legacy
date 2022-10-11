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

export enum AccessRoleType {
  MANAGER = 'MANAGER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}
