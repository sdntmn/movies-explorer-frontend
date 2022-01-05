import React from "react";
import fotoPath from "../../images/foto.jpg";

function MoviesCard({ children, isOpen }) {
  return (
    <li className={`element ${isOpen && "element__color"}`}>
      <div className="element__title">
        <h2 className="element__name">Фильм</h2>
        <span className="element__time">27 минут</span>
      </div>
      <img className="element__img" src={fotoPath} alt="{card.name}" />
      {children}
    </li>
  );
}

export default MoviesCard;
