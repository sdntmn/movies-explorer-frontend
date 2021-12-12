import React from "react";
import logoPath from "../../images/logo.svg";

export default function Header({ children, styles, stylesHider }) {
  return (
    <div className={styles}>
      <header className={stylesHider}>
        <img className='logo' src={logoPath} alt='Логотип сайта' />
        {children}
      </header>
    </div>
  );
}
