import { React } from "react"
import { Link } from "react-router-dom"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"
import Popup from "../Popup/Popup"
import iconPath from "../../images/icon__COLOR_icon-main.svg"
import navPath from "../../images/icon__tree_poloski.png"

const HeaderProfile = function ({ isOpen, onClickIcon, onClickClose }) {
  return (
    <>
      <Header stylesHider="headerProfile">
        <img
          onClick={onClickIcon}
          className="headerProfile__nav-icons"
          src={navPath}
          alt="Логотип сайта"
        />

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
              className="headerProfile__icon"
              src={iconPath}
              alt="Логотип сайта"
            />
          </Link>
        </div>
      </Header>
      <Popup visible={isOpen} onClose={onClickClose} />
    </>
  )
}

export default HeaderProfile
