import React from "react"
import { Link, Routes, Route } from "react-router-dom"
import Popup from "../Popup/Popup"
import Navigation from "../Navigation/Navigation"

import logoPath from "../../images/logo.svg"
import iconPath from "../../images/icon__COLOR_icon-main.svg"
import navPath from "../../images/icon__tree_poloski.png"

export default function Header({
  onClose,
  isOpen,
  onClickIcon,
  isLoggedIn = false,
  visible,
  styleHeader,
  styleAuth,
  children,
}) {
  return (
    <div className={styleHeader}>
      <header className={styleAuth}>
        <Link
          to="/"
          className="header__icon-link"
          aria-label="Иконка для перехода на страницу 'О проекте'"
        >
          <img className="logo" src={logoPath} alt="Логотип сайта" />
        </Link>
        {isLoggedIn ? (
          <img
            onClick={isOpen}
            className="header__profile-nav-icons"
            src={navPath}
            alt="Логотип сайта"
          />
        ) : (
          ""
        )}
        {isLoggedIn ? (
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
            {children}
          </div>
        ) : (
          <>{children}</>
        )}
        <Popup visible={visible} onClose={onClose} />
      </header>
    </div>
  )
}

/* 
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
          */
