// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import React from "react"
import Main from "../Main/Main"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import PageNotFound from "../Page404/Page404"

export default function App() {
  return (
    <div className="root">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="movies" element={<Movies />} />
        <Route path="saved-movies" element={<SavedMovies />} />
        <Route path="not-found" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
