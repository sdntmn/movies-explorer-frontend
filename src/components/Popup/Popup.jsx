import { React } from "react"
import { NavLink } from "react-router-dom"
import pachIconClose from "../../images/icon_close.svg"

const setActive = ({ isActive }) =>
  isActive ? "popup__link-activ" : "popup__link"

const Popup = function ({ visible = false, onClose }) {
  return (
    <div className={`popup ${visible && "popup__is-opened"}`}>
      <button className="popup__icon-close" type="button">
        <img
          onClick={onClose}
          src={pachIconClose}
          alt="Кнопка закрытия попапа"
        />
      </button>
      <nav className="popup__nav">
        <NavLink to="/" className={setActive}>
          Главная
        </NavLink>
        <NavLink to="/movies" className={setActive}>
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className={setActive}>
          Сохранённые фильмы
        </NavLink>
      </nav>
    </div>
  )
}

export default Popup

/* <nav className="popup__links">
        <NavLink
          to="/"
          className="popup__link"
          style={({ isActive }) => {
            return {
              display: "block",
              color: isActive ? "red" : "",
            }
          }}
        >
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "red" : "blue")}
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="popup__link"
          style={({ isActive }) => {
            return {
              display: "block",
              color: isActive ? "red" : "",
            }
          }}
        >
          Сохранённые фильмы
        </NavLink>
      </nav>
      */
