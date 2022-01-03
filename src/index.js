import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import {hydrate} from 'react-dom';


import reportWebVitals from './reportWebVitals';
import { loadableReady} from '@loadable/component';

import { Provider } from "react-redux";
import store from "./store/index";

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css'
import './assest/scss/main.scss';

import App from  "./App";

loadableReady(() => {
  const root = document.getElementById('root')
  hydrate(
    // <React.StrictMode></React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  , root)
})

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
