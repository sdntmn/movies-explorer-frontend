import { React, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"
import Popup from "../Popup/Popup"
import iconPath from "../../images/icon__COLOR_icon-main.svg"
import navPath from "../../images/icon__tree_poloski.png"

const HeaderProfile = function () {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  function handleNavClick() {
    setIsPopupOpen(true)
  }

  function closeAllPopups() {
    setIsPopupOpen(false)
  }
  return (
    <>
      <Header stylesHider="header__profile">
        <img
          onClick={handleNavClick}
          className="header__nav-icons"
          src={navPath}
          alt="Логотип сайта"
        />

        <div className="header__profile-nav">
          <div className="header__profile-links">
            <Navigation
              pathLink="/movies"
              styles="header__profile-link"
              textLink="Фильмы"
            ></Navigation>
            <Navigation
              pathLink="/saved-movies"
              styles="header__profile-link"
              textLink="Сохранённые фильмы"
            ></Navigation>
          </div>
          <Link to="/profile" className="header__profile-icons">
            <span className="header__profile-acaunt">Аккаунт</span>
            <img
              className="header__profile-icon"
              src={iconPath}
              alt="Логотип сайта"
            />
          </Link>
        </div>
      </Header>
      <Popup visible={isPopupOpen} onClose={closeAllPopups} />
    </>
  )
}

export default HeaderProfile
