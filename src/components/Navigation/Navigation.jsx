import React from "react";
import { Link } from "react-router-dom";

export default function Navigation(pathLink, textLink) {
  return (
    <>
      <Link className="header__button" to={pathLink}>
        {textLink}
      </Link>
    </>
  );
}

/* <Link className="header__button root__color-green" to="/login">
        Войти
      </Link>
      */
