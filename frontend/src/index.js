import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import Header from "./components/Header";
import * as serviceWorker from "./serviceWorker";


const routing = (
    <BrowserRouter >
      <Header />
      <App />
    </BrowserRouter >
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();
