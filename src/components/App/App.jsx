// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import React from "react"
import Home from "../Home/Home"
import Footer from "../Footer/Footer"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"
import Main from "../Main/Main"

export default function App() {
  return (
    <div className="root">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/movies"
          element={
            <>
              <Main />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
