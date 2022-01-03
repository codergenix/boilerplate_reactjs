import React from 'react';
import {BrowserRouter , useRoutes } from "react-router-dom";
import loadable from '@loadable/component';

const AuthLayout = loadable(() => import('../layout/AuthLayout'))
AuthLayout.preload();

const Users = loadable(() => import('../page/Users'))
const Login = loadable(() => import('../page/login'))
const Notfound = loadable(() => import('../page/notfound'))

Users.preload();
Login.preload();
Notfound.preload();

const Router=(props)=> {
    const Routerset = () => {
      let routes = useRoutes([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/user",
          element: <AuthLayout />,
          children: [
            { index: true, element: <Users /> }
          ]
        },
        { path: "*", element: <Notfound /> }
      ]);
      return routes;
    };

  return (
    <BrowserRouter>
      <Routerset />
    </BrowserRouter>
  );
}
export default Router


