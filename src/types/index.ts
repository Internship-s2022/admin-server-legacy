import { Request } from 'express';
import { Document, ObjectId, PopulatedDoc } from 'mongoose';

export interface BodyResponse<T> {
  message: string;
  data?: T;
  error: boolean;
}

export interface UserData {
  firebaseUid?: string;
  accessRoleType: string;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  birthDate: Date;
  workedHours?: number;
  isActive: boolean;
}

export interface ProjectData {
  _id?: string;
  clientName: PopulatedDoc<Document<ObjectId> & ClientData>;
  projectName: string;
  description: string;
  notes?: string;
  startDate: Date;
  endDate: Date;
  members?: string[];
  isCritic: string;
  isUpdated: boolean;
  projectType: string;
  isActive: boolean;
}

export interface ClientData {
  name: string;
  localContact: DataContact;
  clientContact: DataContact;
  projects?: PopulatedDoc<Document<ObjectId> & ProjectData>[];
  relationshipStart?: Date;
  relationshipEnd?: Date;
  notes?: string;
  isActive: boolean;
  _id?: string;
}

export interface DataContact {
  name: string;
  email: string;
}

export interface EmployeeData {
  _id?: string;
  skills?: string[];
  seniority?: string;
  projectHistory?: PopulatedDoc<Document<ObjectId> & MemberData>[];
  absences?: AbsenceData[];
  user: PopulatedDoc<Document<ObjectId> & UserData>;
  potentialRole?: string[];
  notes?: string;
  availability: boolean;
}

export interface AbsenceData {
  startDate: Date;
  endDate?: Date;
  motive: string;
}

export interface MemberData {
  _id?: string;
  hasHelper?: boolean;
  helper?: HelperData[];
  employee?: PopulatedDoc<Document<ObjectId> & EmployeeData>;
  project?: PopulatedDoc<Document<ObjectId> & ProjectData>;
  role: RoleType;
  dedication?: number;
  startDate?: Date;
  endDate?: Date;
  active: boolean;
}

export interface HelperData {
  _id?: string;
  helperReference: PopulatedDoc<Document<ObjectId> & EmployeeData>;
  dependency: number;
  dedication: number;
  isActive: boolean;
}
export enum RoleType {
  DEV = 'DEV',
  QA = 'QA',
  UX_UI = 'UX/UI',
  PM = 'PM',
  TL = 'TL',
}
export interface RequestWithFirebase extends Request {
  firebaseUid?: string;
}

export enum AccessRoleType {
  MANAGER = 'MANAGER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export enum MainRoutes {
  USERS = '/users',
  PROJECTS = '/projects',
  CLIENTS = '/clients',
  EMPLOYEES = '/employees',
  MEMBERS = '/members',
  NOTIFICATIONS = '/notifications',
  CRON = '/cron',
}

export enum NotificationType {
  PROJECT = 'PROJECT',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT',
}
export interface NotificationsData {
  notificationType: string;
  employee?: string;
  project?: string;
  client?: string;
  date: Date;
  reasonType: number;
  isChecked?: boolean;
  customMessage?: string;
}
