import cron from 'node-cron';

import { clientsWithCloseEndDate, clientsWithoutProjects } from '../cronJobs/clientNotifications';
// index con todas las funciones para el cronjob
import { absenceEmployees, employeesWithoutProjects } from './employee-notification';
import { projectAboutToEnd, projectWithoutMembers } from './projectNotifications';

export const CronJobs = () => {
  cron.schedule(
    //everyday at midnight
    '59 9 * * *',
    async () => {
      try {
        employeesWithoutProjects();
        absenceEmployees();
        clientsWithCloseEndDate();
        clientsWithoutProjects();
        projectWithoutMembers();
        projectAboutToEnd();
      } catch (error) {
        console.error(error);
      }
    },
    {
      scheduled: true,
      timezone: 'America/Argentina/Buenos_Aires',
    },
  );
};
