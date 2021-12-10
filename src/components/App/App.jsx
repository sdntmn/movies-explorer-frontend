// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Navigation from "../Navigation/Navigation";

export default function App() {
  return (
    <div className="root">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header>{Navigation}</Header>
              <Home />
              <Footer />
            </>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
