import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';


import Routing from "./Component/Routing";
import Nav from "./Component/Navigation/Navigation";

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bulma/css/bulma.min.css';

import {BrowserRouter, Route, Switch,Link } from 'react-router-dom';

//

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
       <Nav/>
       <Routing />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
