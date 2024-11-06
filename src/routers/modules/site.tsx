import { LayoutIndex } from '@/layouts';

import { RouteObject } from '../interFace/index';
import React from 'react';
import { Site } from '@/views/site/Site';
import { SiteSetting } from '@/views/site/SiteSetting';

export default [
  {
    path: '/site',
    element: <LayoutIndex />,
    children: [
      {
        path: '/site/:siteId',
        element: <Site />,
        meta: {
          manageSite: true
        }
      },
      {
        path: '/site/add',
        element: <SiteSetting isAdding />
      },
      {
        path: '/site/setting/:siteId',
        element: <SiteSetting />
      }
    ]
  }
] as RouteObject[];
