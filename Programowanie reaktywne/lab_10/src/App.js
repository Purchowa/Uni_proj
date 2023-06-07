import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Posts from "./component/posts";
import React from "react";
import Navbar from "./component/navbar";
import {Outlet} from "react-router-dom"

function App() {
  return (
    <div className={"container-fluid"}>
        <Navbar/>
        <div>
            <div className={"container"}>
                <Outlet/>
            </div>
        </div>
    </div>
  );
}

export default App;
