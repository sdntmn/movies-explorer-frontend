import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";

const Header = function () {
  return (
    <div className='root__cover'>
      <header className='header'>
        <img className='logo' src={logoPath} alt='Логотип сайта' />
        <div className='header__nav'>
          <Link className='header__link' to='/'>
            Регистрация
          </Link>
          <Link className='header__button root__color-green' to='#'>
            Войти
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
