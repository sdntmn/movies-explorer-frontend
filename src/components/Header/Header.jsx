import React from "react"
import { Link } from "react-router-dom"
import Popup from "../Popup/Popup"
import Navigation from "../Navigation/Navigation"
import logoPath from "../../images/logo.svg"
import iconPath from "../../images/icon__COLOR_icon-main.svg"
import navPath from "../../images/icon__tree_poloski.png"
import { Location } from "react-router-dom"

export default function Header({
  onClose,
  isOpen,
  onClickIcon,
  isLoggedIn,
  visible,
}) {
  return (
    <div className={`${isLoggedIn ? "root__cover" : ""}`}>
      <header className={`${isLoggedIn ? "headerProfile" : "header"}`}>
        <Link
          to="/"
          className="header__icon-link"
          aria-label="Иконка для перехода на страницу 'О проекте'"
        >
          <img className="logo" src={logoPath} alt="Логотип сайта" />
        </Link>
        <img
          onClick={isOpen}
          className="headerProfile__nav-icons"
          src={navPath}
          alt="Логотип сайта"
        />
        {isLoggedIn ? (
          <div className="headerProfile__nav">
            <div className="headerProfile__links">
              <Navigation
                pathLink="/movies"
                styles="headerProfile__link"
                textLink="Фильмы"
              ></Navigation>
              <Navigation
                pathLink="/saved-movies"
                styles="headerProfile__link"
                textLink="Сохранённые фильмы"
              ></Navigation>
            </div>
            <Link to="/profile" className="headerProfile__icons">
              <span className="headerProfile__acaunt">Аккаунт</span>
              <img
                className="headerProfileicon"
                src={iconPath}
                alt="Логотип сайта"
              />
            </Link>
          </div>
        ) : (
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
        )}
        <Popup visible={visible} onClose={onClose} />
      </header>
    </div>
  )
}
