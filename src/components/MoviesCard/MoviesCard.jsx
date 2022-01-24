import React, { useEffect, useState } from "react";
import { useLocation, link, Link } from "react-router-dom";
import exportIconPath from "../../images/export_icon.svg";
import pathDeleteIcon from "../../images/delete-movie.svg";

function MoviesCard({
  isOpen,
  trailer,
  time,
  src,
  movieTitle,
  movie,
  deletMovie,
  saveMovie,
}) {
  let locations = useLocation();
  const [textTime, setTextTime] = useState("");

  useEffect(() => {
    function inflectWords() {
      let value = time % 100;
      let num = value % 10;
      if (time)
        if (num > 1 && num < 5) {
          setTextTime("минуты");
        }
      if (num === 1) {
        setTextTime("минута");
      }
      if (num === 0) {
        setTextTime("минут");
      }
      if (num > 4 && num < 21) {
        setTextTime("минут");
      }
      if (time > 4 && time < 21) {
        setTextTime("минут");
      }
      return true;
    }
    inflectWords();
  }, [time]);

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
            {time}&nbsp;{textTime}
          </span>
        </div>
        <a
          href={trailer}
          target="_blank"
          aria-label="Перевод на ютюб-трейлер фильма"
          rel="noreferrer"
        >
          <img className="element__img" src={src} alt={movieTitle} />
        </a>
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
