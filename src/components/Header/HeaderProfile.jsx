import React from "react"
import { Link } from "react-router-dom"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"
import iconPath from "../../images/icon__COLOR_icon-main.svg"

const HeaderProfile = function () {
  return (
    <>
      <Header stylesHider="header__profile">
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
    </>
  )
}

export default HeaderProfile
