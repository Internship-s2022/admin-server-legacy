import cron from 'node-cron';

// index con todas las funciones para el cronjob
import { projectAboutToEnd, projectWithoutMembers } from './projectNotifications';

export const CronJobs = () => {
  cron.schedule(
    //everyday at midnight
    '00 00 * * *',
    async () => {
      try {
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
