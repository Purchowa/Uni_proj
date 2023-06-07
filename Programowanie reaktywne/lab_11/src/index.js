import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {isExpired} from "react-jwt";

import SignUpForm from "./components/signUpForm";
import Home from "./components/home";
import Posts from "./components/posts";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>}>
                  <Route path="home" element={<Home/>}/>
                  <Route path="posts" element={isExpired(localStorage.getItem('token')) ? <Navigate replace to={'/home'}/> : <Posts/>}/>
                  <Route path="login" element={<LoginForm/>}/>
                  <Route path="signup" element={<SignUpForm/>}/>
                  <Route path="*" element={ <NotFound/> }/>
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
// <Navigate/> zmienia fizycznie path na home.
// Gdyby dać samo <Home/> to ścieżka będzie do posts, choć wyświetli się home.
reportWebVitals();
