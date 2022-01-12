import React from "react";
import { Link } from "react-router-dom";
import Popup from "../Popup/Popup";
import Navigation from "../Navigation/Navigation";
import logoPath from "../../images/logo.svg";
import navPath from "../../images/three-poloski.svg";

export default function Header({
  onClose,
  isOpen,
  isLoggedIn = false,
  visible,
  styleHeader,
  styleAuth,
  children,
  isNotActive,
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
        {/*Авторизированный пользователь ? при разрешении 768 + бургер : останутся кнопки рег. и войти  */}
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
        {/*Авторизированный пользователь ? + btn "Фильмы" и "Сохр. фильмы" + link на профиль : останутся кнопки рег. и войти  */}
        {isLoggedIn ? (
          <div className="header__profile-nav">
            <div className="header__profile-links">
              <Navigation
                pathLink="/movies"
                styles="header__profile-link"
                textLink="Фильмы"
              />
              <Navigation
                pathLink="/saved-movies"
                styles="header__profile-link"
                textLink="Сохранённые фильмы"
              />
            </div>
            {children}
          </div>
        ) : (
          <>{children}</>
        )}
        <Popup visible={visible} onClose={onClose} isNotActive={isNotActive} />
      </header>
    </div>
  );
}
