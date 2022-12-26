import { MemberData } from 'src/types';

export interface Member extends Omit<MemberData, 'project'> {
  project: {
    projectName: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
  };
}
