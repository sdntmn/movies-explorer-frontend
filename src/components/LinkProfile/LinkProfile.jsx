import { React } from "react"
import { Link } from "react-router-dom"
import iconPath from "../../images/icon__COLOR_icon-main.svg"

const LinkProfile = function ({ pathLink }) {
  return (
    <Link to={pathLink} className="header__profile-icons">
      <span className="header__profile-acaunt">Аккаунт</span>
      <img className="header__profileicon" src={iconPath} alt="Логотип сайта" />
    </Link>
  )
}

export default LinkProfile