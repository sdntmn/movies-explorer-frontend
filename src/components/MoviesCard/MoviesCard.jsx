import React from "react";
import { useLocation } from "react-router-dom";
import exportIconPath from "../../images/export_icon.svg";
import pathDeleteIcon from "../../images/delete-movie.svg";
import MoviesButton from "../MoviesButton/MoviesButton";

function MoviesCard({
  isOpen,
  time,
  src,
  movieTitle,
  onAddCollecnion,
  film,
  arraySaveMovies,
  handleCardDelete,
  setArraySaveMovies,
  deletMovie,
  saveMovie,
}) {
  let locations = useLocation();

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
        <img className="element__img" src={src} alt={movieTitle} />
        {locations.pathname === "/movies" && (
          <MoviesButton
            arraySaveMovies={arraySaveMovies}
            onAddCollecnion={onAddCollecnion}
            film={film}
            setArraySaveMovies={setArraySaveMovies}
            className={
              !film.state
                ? "element__button-not-active"
                : "element__button-active"
            }
          >
            {!film.state ? (
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
        {locations.pathname === "/saved-movies" && (
          <MoviesButton
            arraySaveMovies={arraySaveMovies}
            deletMovie={deletMovie}
            saveMovie={saveMovie}
            className="element__button-not-active"
          >
            <img
              className="element__icon"
              src={pathDeleteIcon}
              alt="иконка удаления"
            />
          </MoviesButton>
        )}
      </li>
    </>
  );
}

export default MoviesCard;
