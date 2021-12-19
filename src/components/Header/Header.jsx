import React from "react"
import { Link } from "react-router-dom"
import logoPath from "../../images/logo.svg"

export default function Header({ children, styles, stylesHider }) {
  return (
    <div className={styles}>
      <header className={stylesHider}>
        <Link
          to="/"
          className="header__icon-link"
          aria-label="Иконка для перехода на страницу 'О проекте'"
        >
          <img className="logo" src={logoPath} alt="Логотип сайта" />
        </Link>
        {children}
      </header>
    </div>
  )
}
