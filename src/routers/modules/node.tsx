import { LayoutIndex } from '@/layouts';
import { RouteObject } from '../interFace/index';
import React from 'react';
import { AddNode } from '@/views/site/Node/AddNode';

export default [
  {
    path: '/site/:siteId/node',
    element: <LayoutIndex />,
    children: [
      {
        path: '/site/:siteId/node/add',
        element: <AddNode />,
        meta: {
          manageSite: true
        }
      }
    ]
  }
] as RouteObject[];
