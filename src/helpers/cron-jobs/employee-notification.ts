import isWithinInterval from 'date-fns/isWithinInterval';

import EmployeeModel from 'src/models/employee';
import MemberModel from 'src/models/members';
import NotificationsModel from 'src/models/notifications';

import { Member } from './types';

const employeesWithoutProjects = async () => {
  const allEmployees = await EmployeeModel.find().populate('user', [
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'isActive',
  ]);

  const allMembers: Member[] = await MemberModel.find().populate('project', [
    'projectName',
    'startDate',
    'endDate',
    'isActive',
  ]);

  allEmployees.forEach((employee) => {
    if (
      !allMembers.some(
        (member) =>
          member.active &&
          member.project.isActive &&
          member.employee?.toString() === employee._id.toString() &&
          isWithinInterval(new Date(Date.now()), {
            start: member.project.startDate,
            end: member.project.endDate,
          }),
      )
    ) {
      const newNotification = new NotificationsModel({
        notificationType: 'EMPLOYEE',
        date: new Date(Date.now()),
        employee: employee._id.toString(),
        reasonType: 101,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      newNotification.save();
    }
  });
};

const absenceEmployees = async () => {
  const allEmployees = await EmployeeModel.find().populate('user', [
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'isActive',
  ]);

  allEmployees.forEach((employee) => {
    if (
      employee.absences?.some((absence) =>
        isWithinInterval(absence.startDate, {
          start: new Date(Date.now()),
          end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
        }),
      )
    ) {
      const newNotification = new NotificationsModel({
        notificationType: 'EMPLOYEE',
        date: new Date(Date.now()),
        employee: employee._id.toString(),
        reasonType: 102,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      newNotification.save();
    }
  });
};

export { absenceEmployees, employeesWithoutProjects };
