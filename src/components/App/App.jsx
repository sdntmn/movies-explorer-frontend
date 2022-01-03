// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import { React, useState } from "react"
import Main from "../Main/Main"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import PageNotFound from "../Page404/Page404"
import HeaderProfile from "../HeaderProfile/HeaderProfile"

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  function handleNavClick() {
    setIsPopupOpen(true)
  }

  function closeAllPopups() {
    setIsPopupOpen(false)
  }
  return (
    <div className={`root ${isPopupOpen && "root__color"}`}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route
          path="profile"
          element={
            <>
              <HeaderProfile
                isOpen={isPopupOpen}
                onClickIcon={handleNavClick}
                onClickClose={closeAllPopups}
              />
              <Profile />
            </>
          }
        ></Route>
        <Route
          path="movies"
          element={
            <>
              <HeaderProfile
                isOpen={isPopupOpen}
                onClickIcon={handleNavClick}
                onClickClose={closeAllPopups}
              />
              <Movies isOpen={isPopupOpen} />
            </>
          }
        />
        <Route
          path="saved-movies"
          element={
            <>
              <HeaderProfile
                isOpen={isPopupOpen}
                onClickIcon={handleNavClick}
                onClickClose={closeAllPopups}
              />
              <SavedMovies isOpen={isPopupOpen} />
            </>
          }
        />
        <Route path="not-found" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
