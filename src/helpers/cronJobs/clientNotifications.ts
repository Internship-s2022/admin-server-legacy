import { addBusinessDays } from 'date-fns';
import isWithinInterval from 'date-fns/isWithinInterval';

import { Client } from 'src/helpers/cronJobs/types';
import NotificationsModel from 'src/models/notifications';
import { NotificationType } from 'src/types';

const clientsWithoutProjects = async (allClients: Client[]) => {
  const promises: Promise<unknown>[] = [];

  allClients.forEach((client) => {
    if (
      client.isActive &&
      (!client.projects.length || !client.projects.some((project) => project.isActive))
    ) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.CLIENT,
        date: new Date(Date.now()),
        client: client._id?.toString(),
        reasonType: 201,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      promises.push(newNotification.save());
    }
  });
  await Promise.all(promises);
};

const clientsWithCloseEndDate = async (allClients: Client[]) => {
  const promises: Promise<unknown>[] = [];

  allClients.forEach((client) => {
    if (
      client.isActive &&
      client.relationshipEnd &&
      isWithinInterval(client.relationshipEnd, {
        start: new Date(),
        end: addBusinessDays(new Date(), 5),
      })
    ) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.CLIENT,
        date: new Date(Date.now()),
        client: client._id?.toString(),
        reasonType: 201,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      promises.push(newNotification.save());
    }
  });
  await Promise.all(promises);
};

export { clientsWithCloseEndDate, clientsWithoutProjects };
