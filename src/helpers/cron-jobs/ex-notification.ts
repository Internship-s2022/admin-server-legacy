import cron from 'node-cron';

import { addResourceRequest } from 'src/config/api';

const notificationData = {
  notificationType: 'EMPLOYEE',
  date: '2022-12-13',
  employee: '6362af9589d8042257ae3d69',
  isActive: true,
  isCustom: false,
};

export const ExampleNotification = () => {
  cron.schedule(
    //everyday aty 15:10
    '10 15 * * *',
    async () => {
      const response = await addResourceRequest('/notifications', notificationData);
      return response;
    },
    {
      scheduled: true,
      timezone: 'America/Argentina/Buenos_Aires',
    },
  );
};
