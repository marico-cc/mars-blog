import { LayoutIndex } from '@/layouts';
import { RouteObject } from '../interFace/index';
import React from 'react';
import { ContentList } from '@/views/content/ContentList';
import { ContentEditor } from '@/views/content/ContentEditor';

export default [
  {
    path: '/site/:siteId/article',
    element: <LayoutIndex />,
    children: [
      {
        path: '/site/:siteId/article/list',
        element: <ContentList />,
        meta: {
          manageSite: true
        }
      },
      {
        path: '/site/:siteId/article/add',
        element: <ContentEditor />,
        meta: {
          manageSite: true
        }
      },
      {
        path: '/site/:siteId/article/edit/:contentId',
        element: <ContentEditor />,
        meta: {
          manageSite: true
        }
      }
    ]
  }
] as RouteObject[];
