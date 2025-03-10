import React from 'react';
import { BrowserRouter, useRoutes } from "react-router-dom";
import loadable from '@loadable/component';
//----
const AuthLayout = loadable(() => import('../layout/AuthLayout'))
//---
const Users = loadable(() => import('../page/Users'))
const Login = loadable(() => import('../page/login'))
const Notfound = loadable(() => import('../page/notfound'))
//----
const Router = () => {
  const Routerset = () => {
    let routes = useRoutes([
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
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
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
      <Routerset />
    </BrowserRouter>
  );
}
export default Router