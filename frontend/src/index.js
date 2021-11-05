import { message } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// axios.defaults.baseURL =
//   window.location.protocol + '//' + window.location.host + '/api/';
axios.defaults.baseURL = 'http://localhost:8080/api/';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    message.error(error);
    return Promise.reject(error);
  },
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
