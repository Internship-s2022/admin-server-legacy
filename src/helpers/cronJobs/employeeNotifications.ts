import { addBusinessDays, addDays, isWithinInterval } from 'date-fns';

import NotificationsModel from 'src/models/notifications';
import { NotificationType } from 'src/types';

import { Employee } from './types';

const employeesWithoutProjects = async (allEmployees: Employee[]) => {
  const promises: Promise<unknown>[] = [];

  allEmployees.forEach(async (employee) => {
    if (
      employee.user.isActive &&
      !employee.projectHistory?.some(
        (member) =>
          member.active &&
          member.project?.isActive &&
          member.project?.endDate &&
          isWithinInterval(new Date(Date.now()), {
            start: member.project.startDate,
            end: member.project.endDate,
          }),
      )
    ) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.EMPLOYEE,
        date: new Date(Date.now()),
        employee: employee._id?.toString(),
        reasonType: 101,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      promises.push(newNotification.save());
    }
  });
  await Promise.all(promises);
};

const absenceEmployees = async (allEmployees: Employee[]) => {
  const promises: Promise<unknown>[] = [];

  allEmployees.forEach((employee) => {
    if (
      employee.user.isActive &&
      employee.absences?.some((absence) => absence.endDate === addDays(new Date(), 14))
    ) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.EMPLOYEE,
        date: new Date(),
        employee: employee._id?.toString(),
        reasonType: 102,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      promises.push(newNotification.save());
    }
  });
  await Promise.all(promises);
};

export { absenceEmployees, employeesWithoutProjects };
