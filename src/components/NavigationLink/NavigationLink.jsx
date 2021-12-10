import React from "react";
import { Link } from "react-router-dom";

const NavigationLink = function () {
  return (
    <div className="header__nav">
      <Link className="header__link" to="/register">
        Регистрация
      </Link>
      <Link className="header__button root__color-green" to="/login">
        Войти
      </Link>
    </div>
  );
};

export default NavigationLink;
