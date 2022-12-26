import { MemberData, ProjectData } from 'src/types';

export interface Member extends Omit<MemberData, 'project'> {
  project: {
    projectName: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
  };
}

export interface Project extends Omit<ProjectData, 'members'> {
  members: Member[];
}
