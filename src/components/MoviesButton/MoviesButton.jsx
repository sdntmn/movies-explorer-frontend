import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import exportIconPath from "../../images/export_icon.svg";

function MoviesButton({
  isLiked,
  children,
  className,
  handleAddMovie,
  movie,
  film,
  arraySaveMovies,
  setArraySaveMovies,
  deletMovie,
  saveMovie,
  handleCardDelete,
}) {
  let locations = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  const movieButtonClassName = `card__like-button ${"card__like-button_is-active"}`;

  //const isLayk = film

  function handleSavedOrDelet() {
    let movieId;

    movieId = arraySaveMovies.find((n) => n.movieId === film.movieId);

    if (film._id === undefined) {
      handleAddMovie(film);
    }

    /*
    handleAddMovie
    if (film._id === undefined) {
      movieId = arraySaveMovies.find((n) => n.movieId === film.movieId);

      if (movieId === undefined) {
        handleCardDelete(film);
      }

      onAddCollecnion(film);
    }*/
  }

  function getDeleteMovie() {
    deletMovie(saveMovie);
  }

  return (
    <>
      {locations.pathname === "/movies" && (
        <button
          className={
            !isLiked ? "element__button-not-active" : "element__button-active"
          }
          onClick={handleSavedOrDelet}
          aria-label="Добавить или удалить из избранного"
        >
          {!isLiked ? (
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
          onClick={getDeleteMovie}
          className={className}
          type="button"
          aria-label="Добавить в избранное"
        >
          {children}
        </button>
      )}
    </>
  );
}

export default MoviesButton;
