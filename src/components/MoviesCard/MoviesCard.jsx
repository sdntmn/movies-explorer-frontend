import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesButton from "../MoviesButton/MoviesButton";
import exportIconPath from "../../images/export icon.svg";
import pathDeleteIcon from "../../images/delete-movie.svg";

function MoviesCard({
  isOpen,
  time,
  src,
  movieTitle,
  movie,
  saveMovie,
  onAddCollecnion,
  arraySaveMovies,
  arrayMovies,
}) {
  let location = useLocation();
  const [isSavedIn, setIsSavedIn] = useState(true);

  // состояние сохранено или нет
  function savedInMovies() {
    setIsSavedIn((state) =>
      state === false ? setIsSavedIn(true) : setIsSavedIn(false)
    );
  }
  let text;
  let value = time % 100;
  var num = value % 10;

  if (time)
    if (num > 1 && num < 5) {
      text = "минуты";
    }
  if (num === 1) {
    text = "минута";
  }
  if (num === 0) {
    text = "минут";
  }
  if (num > 4 && num < 21) {
    text = "минут";
  }
  if (time > 4 && time < 21) {
    text = "минут";
  }

  return (
    <>
      <li className={`element ${isOpen && "element__color"}`}>
        <div className="element__title">
          <h2 className="element__name">{movieTitle}</h2>

          <span className="element__time">
            {time}&nbsp;{text}
          </span>
        </div>
        <img className="element__img" src={src} alt="{card.name}" />
        {location.pathname === "/movies" && (
          <MoviesButton
            arraySaveMovies={arraySaveMovies}
            onAddCollecnion={onAddCollecnion}
            movie={movie}
            saveMovie={saveMovie}
            arrayMovies={arrayMovies}
            className={
              isSavedIn
                ? "element__button-not-active"
                : "element__button-active"
            }
          >
            {isSavedIn ? (
              "Сохранить"
            ) : (
              <img
                className="element__icon"
                src={exportIconPath}
                alt="иконка сохранения"
              />
            )}
          </MoviesButton>
        )}
        {location.pathname === "/saved-movies" && (
          <MoviesButton
            movie={movie}
            arraySaveMovies={arraySaveMovies}
            onAddCollecnion={onAddCollecnion}
            className={"element__button-not-active"}
          >
            <img
              className="element__icon"
              src={pathDeleteIcon}
              alt="иконка сохранения"
            />
          </MoviesButton>
        )}
      </li>
    </>
  );
}

export default MoviesCard;
