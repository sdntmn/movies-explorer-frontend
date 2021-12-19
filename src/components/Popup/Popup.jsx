import React from "react"
import { NavLink, Outlet } from "react-router-dom"

const Popup = function () {
  return (
    <>
      <nav className="popup__links">
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
    </>
  )
}

export default Popup
