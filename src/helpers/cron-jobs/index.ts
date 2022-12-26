// index con todos los cronjobs

// index con todas las funciones para el cronjob
import cron from 'node-cron';

import { clientsWithCloseEndDate, clientsWithoutProjects } from './clientNotifications';
export const CronJobs = () => {
  cron.schedule(
    //everyday at midnight
    '0 0 * * *',
    async () => {
      try {
        clientsWithCloseEndDate();
        clientsWithoutProjects();
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
