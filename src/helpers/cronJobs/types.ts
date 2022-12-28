import { ClientData, EmployeeData, MemberData, ProjectData } from 'src/types';

export interface Project extends Omit<ProjectData, 'members'> {
  members: Member[];
}
export interface Employee extends Omit<EmployeeData, 'projectHistory' | 'user'> {
  projectHistory: Member[];
  user: User;
}
export interface Member extends Omit<MemberData, 'project'> {
  project: {
    projectName: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
  };
}

export interface Member extends Omit<MemberData, 'project'> {
  project: {
    projectName: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
  };
}

export interface ClientsProjects {
  projectName: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  isCritic: boolean;
  description: string;
}

export interface Client extends Omit<ClientData, 'projects'> {
  projects: ClientsProjects[];
}

export interface User {
  isActive: boolean;
}
