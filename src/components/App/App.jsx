// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { React, useState } from "react";
// Компоненты ========================================
import ProtectedRoute from "../../contexts/ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../Page404/Page404";
import Header from "../Header/Header";
import LinkProfile from "../LinkProfile/LinkProfile";
import Navigation from "../Navigation/Navigation";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const signin = (newUser, cb) => {
    setCurrentUser(newUser);
    cb();
  };
  const signout = (cb) => {
    setCurrentUser(null);
    cb();
  };
  const value = { currentUser, signin, signout };

  function handleEditStateActive() {
    setIsEdit(true);
  }

  function handleEditStateNotActive() {
    setIsEdit(false);
  }

  function handleNavClick() {
    setIsPopupOpen(true);
  }

  function closeAllPopups() {
    setIsPopupOpen(false);
  }
  return (
    <CurrentUserContext.Provider value={value}>
      <div className={`root ${isPopupOpen && "root__color"}`}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  styleAuth={`${isLoggedIn ? "header__profile" : "header"}`}
                  styleHeader="root__cover"
                  isLoggedIn={isLoggedIn}
                  visible={isPopupOpen}
                  onClose={closeAllPopups}
                  isOpen={handleNavClick}
                >
                  {!isLoggedIn ? (
                    <>
                      <div className="header__nav">
                        <Navigation
                          pathLink="/register"
                          styles="header__link"
                          textLink="Регистрация"
                        />
                        <Navigation
                          pathLink="/login"
                          styles="header__button root__color-green"
                          textLink="Войти"
                        />
                      </div>
                    </>
                  ) : (
                    <LinkProfile pathLink="/profile" />
                  )}
                </Header>
                <Main />
              </>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                {
                  <>
                    <Header
                      styleAuth={`${isLoggedIn ? "header__profile" : "header"}`}
                      isLoggedIn={isLoggedIn}
                      visible={isPopupOpen}
                      onClose={closeAllPopups}
                      isOpen={handleNavClick}
                    >
                      <LinkProfile pathLink="/profile" />
                    </Header>
                    <Profile isEditState={isEdit}
                      isActive={handleEditStateActive}
                      isNotActive={handleEditStateNotActive} />
                  </>
                }
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                {
                  <>
                    <Header
                      styleAuth={`${isLoggedIn ? "header__profile" : "header"}`}
                      isLoggedIn={isLoggedIn}
                      visible={isPopupOpen}
                      onClose={closeAllPopups}
                      isOpen={handleNavClick}
                    >
                      <LinkProfile pathLink="/profile" />
                    </Header>
                    <Movies isOpen={handleNavClick}/>
                  </>
                }
              </ProtectedRoute>
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                {
                  <>
                    <Header
                      styleAuth={`${isLoggedIn ? "header__profile" : "header"}`}
                      isLoggedIn={isLoggedIn}
                      visible={isPopupOpen}
                      onClose={closeAllPopups}
                      isOpen={handleNavClick}
                    >
                      <LinkProfile pathLink="/profile" />
                    </Header>
                    <SavedMovies isOpen={handleNavClick}/>
                  </>
                }
              </ProtectedRoute>
            }
          />

          <Route path="not-found" element={<PageNotFound />} />
          <Route
            path="register"
            element={
              <>
                <Header styleAuth="header__auth" />
                <Register />
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                <Header styleAuth="header__auth" />
                <Login />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}
