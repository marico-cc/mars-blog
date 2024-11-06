import React from 'react';
import lazyLoad from '../utils/lazyLoad';
import { RouteObject } from '../interFace/index';
import Auth from '@/views/login/Login';

const login: Array<RouteObject> = [
  {
    children: [
      {
        path: '/auth',
        element: <Auth />,
        meta: {
          requiresAuth: false,
          title: '授权',
          key: 'auth'
        }
      }
    ]
  }
];

export default login;
