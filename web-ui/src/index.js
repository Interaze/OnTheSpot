// import React, { StrictMode } from "react";
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginForm from './LoginForm'
import Analytics from './Analytics';
import Settings from './Settings';
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="home" element={<App/>}/>
      <Route path="analytics" element={<Analytics/>}/>
      <Route path="settings" element={<Settings/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();