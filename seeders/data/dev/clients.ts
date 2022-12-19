import mongoose from 'mongoose';

const clientList = [
  {
    _id: new mongoose.Types.ObjectId('6351a374a61c5a2de55a0637'),
    name: 'JJ Sistems',
    localContact: {
      name: 'Oscar Gomez',
      email: 'oscar.gomez@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('63779c28028903b499560657'),
    },
    clientContact: {
      name: 'Baltazar Alarcon',
      email: 'baltazar.cortina@gmail.com',
      _id: new mongoose.Types.ObjectId('63779c28028903b499560658'),
    },
    projects: [
      '6351a8117acb354d2e766af7',
      '635ad36c7ed1e50d73016749',
      '63779e4b028903b4995606ae',
      '6377a96cb472e1b11e2d63a4',
    ],
    relationshipStart: new Date('2020-11-14T00:00:00Z'),
    relationshipEnd: new Date('2023-07-03T00:00:00Z'),
    isActive: true,
    __v: 0,
    notes: 'Esto es una nota para un cliente',
  },
  {
    _id: new mongoose.Types.ObjectId('6351a40da61c5a2de55a063b'),
    name: 'Google',
    localContact: {
      name: 'Julian Demeglio',
      email: 'julian.demeglio@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('6351a40da61c5a2de55a063c'),
    },
    clientContact: {
      name: 'Esteban Lima',
      email: 'esteban.lima@gmail.com',
      _id: new mongoose.Types.ObjectId('6351acc9e27c9504131b771c'),
    },
    projects: [
      '6351a72d7acb354d2e766aed',
      '6351a7777acb354d2e766af1',
      '63779dfba3cedd0d374aa261',
      '63779e6b028903b4995606c1',
    ],
    relationshipStart: new Date('2020-10-24T00:00:00Z'),
    relationshipEnd: new Date('2024-03-03T00:00:00Z'),
    isActive: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6351a463a61c5a2de55a063f'),
    name: 'Pintureria Calcagno',
    localContact: {
      name: 'Bautista Merlini',
      email: 'bautista.merlini@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('6351a463a61c5a2de55a0640'),
    },
    clientContact: {
      name: 'Matias Perez',
      email: 'matias.perez@gmail.com',
      _id: new mongoose.Types.ObjectId('6351acf2e27c9504131b771e'),
    },
    projects: ['6351a8957acb354d2e766afb', '6351a8c17acb354d2e766aff'],
    relationshipStart: new Date('2019-12-04T00:00:00Z'),
    relationshipEnd: new Date('2022-12-12T00:00:00Z'),
    isActive: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6351a6317acb354d2e766ae2'),
    name: 'Parque de la costa',
    localContact: {
      name: 'Jorge Paladini',
      email: 'jorge.paladini@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('6351a6317acb354d2e766ae3'),
    },
    clientContact: {
      name: 'Manuel Espinoza',
      email: 'manuel.espinoza@gmail.com',
      _id: new mongoose.Types.ObjectId('6351a6317acb354d2e766ae4'),
    },
    projects: ['6351a6637acb354d2e766ae7', '6373b52795a9eb286ea567ef'],
    relationshipStart: new Date('2021-03-04T00:00:00Z'),
    relationshipEnd: new Date('2023-10-08T00:00:00Z'),
    isActive: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('636d5700ba275c63c679fd3a'),
    name: 'Radium Rocket',
    localContact: {
      name: 'Oscar Gomez',
      email: 'oscar.gomez@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('636d5700ba275c63c679fd3b'),
    },
    clientContact: {
      name: 'Baltazar Cortina',
      email: 'baltazar.cortina@gmail.com',
      _id: new mongoose.Types.ObjectId('636d5700ba275c63c679fd3c'),
    },
    projects: [],
    relationshipStart: new Date('2020-03-04T00:00:00Z'),
    relationshipEnd: new Date('2023-10-08T00:00:00Z'),
    isActive: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('636d5730ba275c63c679fd3e'),
    name: 'Pintureria Tres Hermanos',
    localContact: {
      name: 'Luciano Gomez',
      email: 'luciano.gomez@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('6377a86bb472e1b11e2d6372'),
    },
    clientContact: {
      name: 'Axel Trillo',
      email: 'axel.trillo@gmail.com',
      _id: new mongoose.Types.ObjectId('6377a86bb472e1b11e2d6373'),
    },
    projects: [],
    relationshipStart: new Date('2021-03-04T00:00:00Z'),
    relationshipEnd: new Date('2023-11-22T00:00:00Z'),
    isActive: true,
    __v: 0,
    notes: 'Agregar nota',
  },
  {
    _id: new mongoose.Types.ObjectId('6373afcc0598a441f424615a'),
    name: 'Churreria El Topo',
    localContact: {
      name: 'Manolo Herrera',
      email: 'manolo.herrera@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('6373afcc0598a441f424615b'),
    },
    clientContact: {
      name: 'Tutan Camon',
      email: 'tutan.camon@gmail.com',
      _id: new mongoose.Types.ObjectId('6373afcc0598a441f424615c'),
    },
    projects: ['6374e0948bf6c4830fd856e0', '6374fef4038b7315df14fa9d'],
    relationshipStart: new Date('2020-03-04T00:00:00Z'),
    relationshipEnd: new Date('2023-10-08T00:00:00Z'),
    isActive: true,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6373c0e2d42da3d69bd8ea4b'),
    name: 'Cerrajeria el Pato',
    localContact: {
      name: 'Oscar Perez',
      email: 'oscar.Perez@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('63750077038b7315df14fb1c'),
    },
    clientContact: {
      name: 'Juan Perez',
      email: 'juanperez@gmail.com',
      _id: new mongoose.Types.ObjectId('63750077038b7315df14fb1d'),
    },
    projects: [],
    relationshipStart: new Date('2022-11-02T16:39:44Z'),
    notes: 'abcde',
    isActive: false,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('63779d0f028903b499560674'),
    name: 'Badium Rocket',
    localContact: {
      name: 'Luciano Alarcon',
      email: 'luciano.alarcon@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('63779d20028903b49956067b'),
    },
    clientContact: {
      name: 'Aquiles Mariani',
      email: 'aquilesMariani@gmail.com',
      _id: new mongoose.Types.ObjectId('63779d20028903b49956067c'),
    },
    projects: [],
    relationshipStart: new Date('2022-11-18T14:54:38Z'),
    relationshipEnd: new Date('2022-11-23T14:54:38Z'),
    notes: '',
    isActive: false,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6377a80baa5a452889295c44'),
    name: 'Badium Pocket',
    localContact: {
      name: 'Luciano Alarcon',
      email: 'luciano.alarcon@radiumrocket.com',
      _id: new mongoose.Types.ObjectId('6377a80baa5a452889295c45'),
    },
    clientContact: {
      name: 'Aquiles Mariani',
      email: 'aquilesMariani@gmail.com',
      _id: new mongoose.Types.ObjectId('6377a80baa5a452889295c46'),
    },
    projects: [],
    relationshipStart: new Date('2022-11-18T15:42:34Z'),
    relationshipEnd: new Date('2022-12-13T15:42:34Z'),
    notes: 'Esto es una nota',
    isActive: false,
    __v: 0,
  },
];

export type ClientType = typeof clientList;

export default clientList;
