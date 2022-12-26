import cron from 'node-cron';

// index con todas las funciones para el cronjob
import { absenceEmployees, employeesWithoutProjects } from './employee-notification';

export const CronJobs = () => {
  cron.schedule(
    //everyday at midnight
    '42 14 * * *',
    async () => {
      try {
        employeesWithoutProjects();
        absenceEmployees();
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
