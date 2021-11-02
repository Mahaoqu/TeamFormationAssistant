import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import App from './App';
import Header from './Header';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

// axios.defaults.baseURL =  window.location.protocol + '//' + window.location.host + "/api/";
axios.defaults.baseURL =  "http://localhost:8080/api/";

const routing = (
  <BrowserRouter>
    <Header />
    <App />
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
