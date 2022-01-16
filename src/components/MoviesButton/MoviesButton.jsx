import React from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesButton({
  children,
  className,
  onAddCollecnion,
  movie,

  deletMovie,
  saveMovie,
}) {
  let locations = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  const movieButtonClassName = `card__like-button ${"card__like-button_is-active"}`;

  /*
  const addMovie = movie.movieId.some((i) => i.duration === arraySaveMovies.moviedId);
  const cardLikeButtonClassName = `card__like-button ${
    addMovie && "card__like-button_is-active"
  }`;

*/

  function handleSaveMovie() {
    onAddCollecnion(movie);
  }

  function getDeleteMovie() {
    deletMovie(saveMovie);
  }

  return (
    <>
      {locations.pathname === "/movies" && (
        <button
          onClick={handleSaveMovie}
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
