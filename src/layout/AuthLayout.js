import React from "react";
import loadable from '@loadable/component';
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Service from '../Utils/service';
//---
const Header = loadable(() => import('./header'));
const Footer = loadable(() => import('./footer'));
//---
const AuthLayout = () => {
  const LoginCheck = async () => {
    let isloginn = await Service.Getlogin();
    if (!isloginn) {
      window.location.href = "/login";
    }
  }
  React.useEffect(() => {
    LoginCheck();
    window.addEventListener("storage", (event) => {
      if (event.key === 'auth_Token') {
        LoginCheck();
      }
    });
  }, [])
  return (
    <section className="authlayout">
      <header className="site-header">
        <Header />
      </header>
      <div className="middle-content"> <Outlet /> </div>
      <footer className="site-footer">
        <Footer />
      </footer>
    </section>
  );
}
export default React.memo(AuthLayout)