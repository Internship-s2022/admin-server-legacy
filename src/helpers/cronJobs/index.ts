import { ClientModel, EmployeeModel, ProjectModel } from 'src/models';

import { clientsWithCloseEndDate, clientsWithoutProjects } from '../cronJobs/clientNotifications';
import { absenceEmployees, employeesWithoutProjects } from './employeeNotifications';
import { projectAboutToEnd, projectWithoutMembers } from './projectNotifications';
import { Client, Employee, Project } from './types';

export const execCronJobs = async () => {
  const allEmployees: Employee[] = await EmployeeModel.find()
    .populate('user', ['isActive'])
    .populate({
      path: 'projectHistory',
      select: 'project role active',
      populate: {
        path: 'project',
        select: 'projectName startDate endDate isActive',
      },
    });

  const allProjects: Project[] = await ProjectModel.find();

  const allClients: Client[] = await ClientModel.find().populate('projects', [
    'endDate',
    'isActive',
  ]);

  await Promise.all([
    employeesWithoutProjects(allEmployees),
    absenceEmployees(allEmployees),
    clientsWithCloseEndDate(allClients),
    clientsWithoutProjects(allClients),
    projectWithoutMembers(allProjects),
    projectAboutToEnd(allProjects),
  ]);
};
