import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  {
    text: 'müşteri ekle',
    path: '.',
    icon: <FaWpforms />,
  },
  {
    text: 'bütün müşteriler',
    path: 'all-clients',
    icon: <FaWpforms />,
  },
  {
    text: 'Bütün invoice',
    path: 'all-invoices',
    icon: <FaWpforms />,
  },
  {
    text: 'invoice ekle',
    path: 'add-invoice',
    icon: <FaWpforms />,
  },
  /* {
    text: 'add job',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    text: 'all jobs',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    text: 'admin',
    path: 'admin',
    icon: <MdAdminPanelSettings />,
  },*/
];

export default links;
