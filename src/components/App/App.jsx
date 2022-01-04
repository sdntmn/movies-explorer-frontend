// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import { React, useState } from "react"
// Компоненты ========================================
import ProtectedRoute from "../../contexts/ProtectedRoute"
import Main from "../Main/Main"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import PageNotFound from "../Page404/Page404"
import HeaderProfile from "../HeaderProfile/HeaderProfile"
import Header from "../Header/Header"
import Popup from "../Popup/Popup"

import { CurrentUserContext } from "../../contexts/CurrentUserContext"

export default function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const signin = (newUser, cb) => {
    setCurrentUser(newUser)
    cb()
  }
  const signout = (cb) => {
    setCurrentUser(null)
    cb()
  }
  const value = { currentUser, signin, signout }

  const pathName = "/"

  function handleNavClick() {
    setIsPopupOpen(true)
  }

  function closeAllPopups() {
    setIsPopupOpen(false)
  }
  return (
    <CurrentUserContext.Provider value={value}>
      <div className={`root ${isPopupOpen && "root__color"}`}>
        <Header
          isLoggedIn={isLoggedIn}
          pathName={pathName}
          visible={isPopupOpen}
          onClose={closeAllPopups}
          isOpen={handleNavClick}
        />

        <Routes>
          <Route path="/" element={<Main />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies />
              </ProtectedRoute>
            }
          />

          <Route path="not-found" element={<PageNotFound />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}
