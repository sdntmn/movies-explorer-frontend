import React from "react"
import { useState } from "react"
import exportIconPath from "../../images/export icon.svg"
import fotoPath from "../../images/foto.jpg"

function MoviesCard() {
  const [savedIn, setSavedIn] = useState(false)

  function savedInMovies() {
    setSavedIn((state) =>
      state === false ? setSavedIn(true) : setSavedIn(false)
    )
  }

  return (
    <li className="element">
      <div className="element__title">
        <h2 className="element__name">Фильм</h2>
        <span className="element__time">27 минут</span>
      </div>
      <img className="element__img" src={fotoPath} alt="{card.name}" />

      {savedIn ? (
        <button
          className="element__button-active"
          type="button"
          aria-label="Добавить в избранное"
          onClick={savedInMovies}
        >
          <img
            className="element__icon"
            src={exportIconPath}
            alt="иконка сохранения"
          />
        </button>
      ) : (
        <button
          className=" element__button-not-active"
          type="button"
          aria-label="Добавить в избранное"
          onClick={savedInMovies}
        >
          Сохранить
        </button>
      )}
    </li>
  )
}

export default MoviesCard
