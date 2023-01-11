import { addDays, format } from 'date-fns';

import NotificationsModel from 'src/models/notifications';
import { NotificationType } from 'src/types';

import { Project } from '../cronJobs/types';

const projectWithoutMembers = async (allProjects: Project[]) => {
  const promises: Promise<unknown>[] = [];

  // TODO: Define a limit date to avoid creating to many times the "projectWithoutMembers" notification

  allProjects.forEach((item) => {
    if (!item.members?.length && item.isActive && !item.members?.some((member) => member.active)) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.PROJECT,
        limitDate: new Date(),
        project: item._id?.toString(),
        reasonType: 301,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      promises.push(newNotification.save());
    }
  });
  await Promise.all(promises);
};

const projectAboutToEnd = async (allProjects: Project[]) => {
  const promises: Promise<unknown>[] = [];

  allProjects.forEach((item) => {
    if (
      item.isActive &&
      item.endDate &&
      format(item.endDate, 'dd/MM/yyyy') === format(addDays(new Date(), 14), 'dd/MM/yyyy')
    ) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.PROJECT,
        limitDate: item.endDate,
        project: item._id?.toString(),
        reasonType: 302,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      promises.push(newNotification.save());
    }
  });
  await Promise.all(promises);
};

export { projectAboutToEnd, projectWithoutMembers };
