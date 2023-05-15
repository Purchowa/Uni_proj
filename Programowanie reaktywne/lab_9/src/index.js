import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from "./component/home";
import Posts from "./component/posts";
import NotFound from "./component/notFound";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<App/>}>
                  <Route path={"home"} element={<Home/>}/>
                  <Route path={"posts"} element={<Posts/>}/>
                  <Route path={"*"} element={<NotFound/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
