import { LayoutIndex } from '@/layouts';

import lazyLoad from '../utils/lazyLoad';
import { RouteObject } from '../interFace/index';
import React from 'react';
import { Home } from '@/views/home/Home';

export default [
  {
    path: '/home',
    element: <LayoutIndex />,
    children: [
      {
        path: '/home',
        element: <Home />
      }
    ]
  }
] as RouteObject[];
