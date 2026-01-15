import { FC } from 'react';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Backet';
import DevicePage from './pages/DevicePage';
import Shop from './pages/Shop';
import {
   ADMIN_ROUTE,
   BASKET_ROUTE,
   DEVICE_ROUTE,
   LOGIN_ROUTE,
   REGISTRATION_ROUTE,
   SHOP_ROUTE,
} from './utils/consts';
export interface IRouter {
   path: string;
   Component: FC;
}

export const authRoutes: IRouter[] = [
   {
      path: ADMIN_ROUTE,
      Component: Admin,
   },
   {
      path: BASKET_ROUTE,
      Component: Basket,
   },
];
export const publicRoutes: IRouter[] = [
   {
      path: LOGIN_ROUTE,
      Component: Auth,
   },
   {
      path: REGISTRATION_ROUTE,
      Component: Auth,
   },
   {
      path: SHOP_ROUTE,
      Component: Shop,
   },
   {
      path: DEVICE_ROUTE + '/:id',
      Component: DevicePage,
   },
];
