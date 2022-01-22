import React from "react";
import { useLocation } from "react-router-dom";
import exportIconPath from "../../images/export_icon.svg";
import pathDeleteIcon from "../../images/delete-movie.svg";

function MoviesCard({
  isOpen,
  time,
  src,
  movieTitle,
  movie,
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

  function handleSavedOrDelet() {
    // false - значит нет в сохраненных
    if (locations.pathname === "/movies") {
      deletMovie(movie);
    }
    if (locations.pathname === "/saved-movies") {
      deletMovie(saveMovie);
    }
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
          <button
            onClick={handleSavedOrDelet}
            className={
              !movie.state
                ? "element__button-not-active"
                : "element__button-active"
            }
            type="button"
            aria-label="Добавить в избранное"
          >
            {!movie.state ? (
              "Сохранить"
            ) : (
              <img
                className="element__icon"
                src={exportIconPath}
                alt="иконка сохранения"
              />
            )}
          </button>
        )}
        {locations.pathname === "/saved-movies" && (
          <button
            onClick={handleSavedOrDelet}
            className="element__button-not-active"
            type="button"
            aria-label="Добавить в избранное"
          >
            <img
              className="element__icon"
              src={pathDeleteIcon}
              alt="иконка удаления"
            />
          </button>
        )}
      </li>
    </>
  );
}

export default MoviesCard;
