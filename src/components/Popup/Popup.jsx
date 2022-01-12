import { React, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LinkProfile from "../LinkProfile/LinkProfile";
import pachIconClose from "../../images/icon_close.svg";

const setActive = ({ isActive }) =>
  isActive ? "popup__link-activ" : "popup__link";

const Popup = function ({ visible = false, onClose }) {
  // Закрытие по esc
  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [onClose]);

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
        <NavLink to="/" className={setActive} onClick={onClose}>
          Главная
        </NavLink>
        <NavLink to="/movies" className={setActive} onClick={onClose}>
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className={setActive} onClick={onClose}>
          Сохранённые фильмы
        </NavLink>
      </nav>
      <div className="popup__nav popup__nav-link-profile">
        <LinkProfile pathLink="/profile" onClose={onClose} />
      </div>
    </div>
  );
};

export default Popup;
