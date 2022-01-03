import React,{useEffect} from "react";
import loadable from '@loadable/component';
import { useNavigate } from 'react-router-dom';
import { Outlet} from "react-router-dom";
import Service from '../Utils/service';

const Header = loadable(() => import('./header'));  
const Footer = loadable(() => import('./footer')); 
Header.preload();
Footer.preload();

export default function AuthLayout(props) {
  const navigate = useNavigate();

  useEffect(()=>{
    var loginstatus = Service.getlogin();
		if (!loginstatus) {
       navigate('/');
		}
  },[])

    return (
      <section className="authlayout">
         <header className="site-header">
            <Header/>
          </header>
          <div className="middle-content"> <Outlet /> </div> 
          <footer className="site-footer">
            <Footer/>
          </footer>
      </section>
    );
}