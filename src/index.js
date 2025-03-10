import React from 'react';
import reportWebVitals from './reportWebVitals';
import { loadableReady } from '@loadable/component';
import { hydrateRoot } from 'react-dom/client';

import { Provider } from "react-redux";
import store from "./store/index";
//----
import './assest/other.css';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css'
import './assest/scss/main.scss';
//---
import App from "./App";

loadableReady(() => {
  const rootcontainer = document.getElementById('root')
  hydrateRoot(rootcontainer, <Provider store={store}><App /></Provider>)
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
