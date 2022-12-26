import { ClientData, MemberData } from 'src/types';

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
