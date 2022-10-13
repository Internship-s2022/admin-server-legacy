import { Document, ObjectId, PopulatedDoc } from 'mongoose';
export interface BodyResponse<T> {
  message: string;
  data?: T;
  error: boolean;
}

export interface UserData {
  firebaseUid: string;
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
  clientName: string;
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
  localContact: string;
  clientContact: string;
  projects?: PopulatedDoc<Document<ObjectId> & ProjectData>[];
  relationshipStart?: Date;
  relationshipEnd?: Date;
  notes?: string;
  isActive: boolean;
}

export interface EmployeeData {
  skills?: string[];
  seniority?: string;
  projectHistory?: string[];
  absences?: string[];
  user: PopulatedDoc<Document<ObjectId> & UserData>;
  potentialRole?: string[];
  notes?: string;
}
