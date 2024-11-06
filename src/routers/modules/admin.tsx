import { LayoutIndex } from '@/layouts';

import lazyLoad from '../utils/lazyLoad';
import { RouteObject } from '../interFace/index';
import React from 'react';
import { Home } from '@/views/home/Home';
import { SystemSetting } from '@/views/site/SystemSetting';
import { Sites } from '@/views/site/Sites';
import { Users } from '@/views/users/Users';

export default [
  {
    path: '/site',
    element: <LayoutIndex />,
    children: [
      {
        path: '/site/system',
        element: <SystemSetting />
      },
      {
        path: '/site/sites',
        element: <Sites />
      },
      {
        path: '/site/users',
        element: <Users />
      }
    ]
  }
] as RouteObject[];
