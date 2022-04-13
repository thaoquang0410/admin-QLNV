import React from 'react';
import { useRoutes } from 'react-router-dom';
import NotFound from '../pages/404';
import Home from '../pages/home';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      key: 'HOME_PAGE',
      exact: true,
      element: <Home />,
    },
    {
      path: '/protected',
      element: <PrivateRoute><p>This is protected route</p></PrivateRoute>,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  return routes;
};

export default Routes;
