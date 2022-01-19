import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesButton({
  children,
  className,
  onAddCollecnion,
  movie,
  film,
  arraySaveMovies,
  setArraySaveMovies,
  deletMovie,
  saveMovie,
  handleCardDelete,
}) {
  const [isSave, setIsSave] = useState(false);
  let locations = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  const movieButtonClassName = `card__like-button ${"card__like-button_is-active"}`;

  //const isLayk = film

  function handleSavedOrDelet() {
    let movieId;
    console.log(film); /*
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
          onClick={handleSavedOrDelet}
          className={className}
          type="button"
          aria-label="Добавить или удалить из избранного"
        >
          {children}
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
