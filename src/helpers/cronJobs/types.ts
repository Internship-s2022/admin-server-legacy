import { EmployeeData, MemberData, ProjectData } from 'src/types';

export interface Project extends Omit<ProjectData, 'members'> {
  members: Member[];
}
export interface Employee extends Omit<EmployeeData, 'projectHistory'> {
  projectHistory: Member[];
}
export interface Member extends Omit<MemberData, 'project'> {
  project: {
    projectName: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
  };
}
