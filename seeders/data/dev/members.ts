import mongoose from 'mongoose';

const memberList = [
  {
    _id: new mongoose.Types.ObjectId('63652606f744e1c979ccbe08'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('636521b7f5e6dc3b6fa21fc4'),
        dependency: 10,
        dedication: 10,
        isActive: false,
        _id: new mongoose.Types.ObjectId('636540ab6bceb9b68c248d9a'),
      },
    ],
    employee: new mongoose.Types.ObjectId('6362924333e5dd0c870035a2'),
    project: new mongoose.Types.ObjectId('6351a6637acb354d2e766ae7'),
    role: 'DEV',
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6365263cf744e1c979ccbe13'),
    helper: [],
    employee: new mongoose.Types.ObjectId('6362924333e5dd0c870035a2'),
    project: new mongoose.Types.ObjectId('6351a7777acb354d2e766af1'),
    role: 'DEV',
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('63652745f744e1c979ccbe22'),
    helper: [],
    employee: new mongoose.Types.ObjectId('6362af9589d8042257ae3d69'),
    project: new mongoose.Types.ObjectId('6351a7777acb354d2e766af1'),
    role: 'UI_UX',
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('63751fae038b7315df14fc46'),
    helper: [],
    employee: new mongoose.Types.ObjectId('636521b7f5e6dc3b6fa21fc4'),
    project: new mongoose.Types.ObjectId('6351a6637acb354d2e766ae7'),
    role: 'DEV',
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('63765cac198d5fe378b698d3'),
    helper: [],
    employee: new mongoose.Types.ObjectId('6369521d9d53b8a857beec66'),
    project: new mongoose.Types.ObjectId('6351a8957acb354d2e766afb'),
    role: 'DEV',
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6376aab9193921160ef42b22'),
    helper: [],
    employee: new mongoose.Types.ObjectId('6362af9589d8042257ae3d69'),
    project: new mongoose.Types.ObjectId('6351a8957acb354d2e766afb'),
    role: 'UI_UX',
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6376cb0ee488db7f0f7ba6f9'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('636522bff744e1c979ccbdce'),
        dependency: 2,
        dedication: 2,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6376cb0ee488db7f0f7ba6fa'),
      },
    ],
    employee: new mongoose.Types.ObjectId('63652237f744e1c979ccbdc9'),
    project: new mongoose.Types.ObjectId('6351a8957acb354d2e766afb'),
    role: 'DEV',
    startDate: new Date('2022-11-17T23:49:31.921Z'),
    endDate: new Date('2022-11-30T03:00:00Z'),
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6376ce92e488db7f0f7ba71b'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('6362924333e5dd0c870035a2'),
        dependency: 1,
        dedication: 1,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6376ce92e488db7f0f7ba71c'),
      },
    ],
    employee: new mongoose.Types.ObjectId('636cffb3c3a6d46a4797b13d'),
    project: new mongoose.Types.ObjectId('6351a8957acb354d2e766afb'),
    role: 'DEV',
    startDate: new Date('2022-11-18T00:15:03.477Z'),
    endDate: new Date('2022-11-30T03:00:00Z'),
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6376d46be488db7f0f7bb0bd'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('636522bff744e1c979ccbdce'),
        dependency: 1,
        dedication: 1,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6376d46be488db7f0f7bb0be'),
      },
    ],
    employee: new mongoose.Types.ObjectId('63652237f744e1c979ccbdc9'),
    project: new mongoose.Types.ObjectId('6351a8117acb354d2e766af7'),
    role: 'DEV',
    startDate: new Date('2022-11-18T00:39:59.32Z'),
    endDate: new Date('2022-11-30T03:00:00Z'),
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6376d7a6e488db7f0f7bb10b'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('6362af9589d8042257ae3d69'),
        dependency: 1,
        dedication: 1,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6376e129141220bdf666b8c7'),
      },
    ],
    employee: new mongoose.Types.ObjectId('6362924333e5dd0c870035a2'),
    project: new mongoose.Types.ObjectId('6351a8117acb354d2e766af7'),
    role: 'DEV',
    startDate: new Date('2022-11-18T01:33:46.354Z'),
    endDate: new Date('2022-11-30T03:00:00Z'),
    active: true,
    __v: 0,
    memberDedication: 1,
  },
  {
    _id: new mongoose.Types.ObjectId('6376d912e488db7f0f7bb13d'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('636cffb3c3a6d46a4797b13d'),
        dependency: 1,
        dedication: 1,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6376d912e488db7f0f7bb13e'),
      },
    ],
    employee: new mongoose.Types.ObjectId('636522bff744e1c979ccbdce'),
    project: new mongoose.Types.ObjectId('6351a8117acb354d2e766af7'),
    role: 'DEV',
    startDate: new Date('2022-11-18T00:59:48.345Z'),
    endDate: new Date('2022-11-30T03:00:00Z'),
    active: false,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6376e14a141220bdf666b8f7'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('63652237f744e1c979ccbdc9'),
        dependency: 1,
        dedication: 1,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6376e14a141220bdf666b8f8'),
      },
    ],
    employee: new mongoose.Types.ObjectId('636cffb3c3a6d46a4797b13d'),
    project: new mongoose.Types.ObjectId('6351a8117acb354d2e766af7'),
    role: 'DEV',
    memberDedication: 1,
    startDate: new Date('2022-11-18T01:34:51.231Z'),
    endDate: new Date('2022-11-30T03:00:00Z'),
    active: false,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6376e2321fd888dd06a7f127'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('63652237f744e1c979ccbdc9'),
        dependency: 1,
        dedication: 1,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6376e2321fd888dd06a7f128'),
      },
    ],
    employee: new mongoose.Types.ObjectId('6362af9589d8042257ae3d69'),
    project: new mongoose.Types.ObjectId('6351a8117acb354d2e766af7'),
    role: 'DEV',
    memberDedication: 1,
    startDate: new Date('2022-11-16T03:00:00Z'),
    active: false,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6376e34da52ade5c25a040eb'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('6362af9589d8042257ae3d69'),
        dependency: 1,
        dedication: 1,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6376e34da52ade5c25a040ec'),
      },
    ],
    employee: new mongoose.Types.ObjectId('6362924333e5dd0c870035a2'),
    project: new mongoose.Types.ObjectId('6373b52795a9eb286ea567ef'),
    role: 'DEV',
    memberDedication: 1,
    startDate: new Date('2022-11-18T01:43:30.435Z'),
    endDate: new Date('2022-11-30T03:00:00Z'),
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('63779ea8028903b4995606df'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('6362af9589d8042257ae3d69'),
        dependency: 100,
        dedication: 50,
        isActive: true,
        _id: new mongoose.Types.ObjectId('63779ea8028903b4995606e0'),
      },
    ],
    employee: new mongoose.Types.ObjectId('63652237f744e1c979ccbdc9'),
    project: new mongoose.Types.ObjectId('63779e6b028903b4995606c1'),
    role: 'DEV',
    memberDedication: 50,
    startDate: new Date('2022-11-18T15:02:35Z'),
    endDate: new Date('2022-11-23T15:02:35Z'),
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('63779eefa3cedd0d374aa297'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('6362924333e5dd0c870035a2'),
        dependency: 50,
        dedication: 50,
        isActive: true,
        _id: new mongoose.Types.ObjectId('63779eefa3cedd0d374aa298'),
      },
    ],
    employee: new mongoose.Types.ObjectId('636522bff744e1c979ccbdce'),
    project: new mongoose.Types.ObjectId('63779e6b028903b4995606c1'),
    role: 'DEV',
    memberDedication: 100,
    startDate: new Date('2022-11-18T15:03:50Z'),
    active: false,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6377aa18b472e1b11e2d63ee'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('6362af9589d8042257ae3d69'),
        dependency: 20,
        dedication: 50,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6377aa18b472e1b11e2d63ef'),
      },
    ],
    employee: new mongoose.Types.ObjectId('6362924333e5dd0c870035a2'),
    project: new mongoose.Types.ObjectId('6377a96cb472e1b11e2d63a4'),
    role: 'DEV',
    memberDedication: 100,
    startDate: new Date('2022-11-18T15:50:16Z'),
    endDate: new Date('2022-11-23T15:50:16Z'),
    active: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6377aa42b472e1b11e2d6416'),
    helper: [
      {
        helperReference: new mongoose.Types.ObjectId('6362924333e5dd0c870035a2'),
        dependency: 40,
        dedication: 100,
        isActive: true,
        _id: new mongoose.Types.ObjectId('6377aa42b472e1b11e2d6417'),
      },
    ],
    employee: new mongoose.Types.ObjectId('6362af9589d8042257ae3d69'),
    project: new mongoose.Types.ObjectId('6377a96cb472e1b11e2d63a4'),
    role: 'DEV',
    memberDedication: 100,
    startDate: new Date('2022-11-18T15:52:13Z'),
    active: false,
    __v: 0,
  },
];

export type MemberType = typeof memberList;

export default memberList;