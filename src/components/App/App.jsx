// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";

export default function App() {
  return (
    <div className='root'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}
