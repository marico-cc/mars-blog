import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from './interFace';
import NoPath from '@/views/404';

// 导入所有的router
const metaRouters: any = import.meta.glob('./modules/*.tsx', { eager: true });

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach((item: any) => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/auth' />
  },
  {
    path: '/404',
    element: <NoPath />,
    meta: {
      requiresAuth: false,
      title: '404',
      key: '404'
    }
  },
  ...routerArray,
  {
    path: '*',
    element: <Navigate to='/404' />
  }
];
const Router = () => {
  return useRoutes(rootRouter);
};
export default Router;
