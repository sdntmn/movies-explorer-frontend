import React from "react"
import { useState } from "react"
import exportIconPath from "../../images/export icon.svg"
import fotoPath from "../../images/foto.jpg"

function MoviesCard({ children }) {
  return (
    <li className="element">
      <div className="element__title">
        <h2 className="element__name">Фильм</h2>
        <span className="element__time">27 минут</span>
      </div>
      <img className="element__img" src={fotoPath} alt="{card.name}" />
      {children}
    </li>
  )
}

export default MoviesCard
