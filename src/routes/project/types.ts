import { MemberData, ProjectData } from 'src/types';

export enum CriticalType {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
}

export enum ProjectType {
  STAFF_AUGMENTATION = 'STAFF_AUGMENTATION',
  PRODUCT_BUILDING = 'PRODUCT_BUILDING',
}

export interface Project extends Omit<ProjectData, 'members'> {
  members: MemberData[];
}
