import { addBusinessDays } from 'date-fns';
import isWithinInterval from 'date-fns/isWithinInterval';

import { Client } from 'src/helpers/cronJobs/types';
import NotificationsModel from 'src/models/notifications';
import { NotificationType } from 'src/types';

const clientsWithoutProjects = (allClients: Client[]) => {
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
      newNotification.save();
    }
  });
};

const clientsWithCloseEndDate = (allClients: Client[]) => {
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

      newNotification.save();
    }
  });
};

export { clientsWithCloseEndDate, clientsWithoutProjects };
