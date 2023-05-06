import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Posts from "./component/posts";
import React from "react";

function App() {
  return (
    <main className="container">
        <Posts/>
    </main>
  );
}

export default App;
