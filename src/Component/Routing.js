import React from "react";
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import Home from "./Home";
import Login from "./Authentication/Login";
import Registration  from './Authentication/Registration';
import Message from "./TextMessage/TextMessage"
import AudioTransmit from "../Component/AudioTransmit/AudioTransmit";
import Whiteboard from '../Component/Whiteboard/container/Container';
import Pdfff from "../Component//Whiteboard/Pdfff";
import C from '../Component/Whiteboard/canvas/C';
import D from '../Component/Whiteboard/canvas/D';

function Routing() {
  return (
    <div >
          <Switch>
            <Route path="/" component={Home}  exact />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/msg" component={Message} />
            <Route path="/meeting" component={AudioTransmit} />
            <Route path="/whiteboard" component={Whiteboard} />
            <Route path="/pdf" component={Pdfff} />
            <Route path="/drawing" component={C} />
            <Route path="/drawing2" component={D} />
          </Switch>
    </div>
  );
}

export default Routing;
