import React from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesButton({
  children,
  className,
  onAddCollecnion,
  movie,
  isSaveMovies,
  inSave,
}) {
  let locations = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  const movieButtonClassName = `card__like-button ${"card__like-button_is-active"}`;

  console.log(movie.movieId);

  console.log(isSaveMovies);
  /*
  const addMovie = movie.movieId.some((i) => i.duration === isSaveMovies.moviedId);
  const cardLikeButtonClassName = `card__like-button ${
    addMovie && "card__like-button_is-active"
  }`;

*/
  function handleSaveMovie() {
    onAddCollecnion(movie);
  }
  console.log(movie);
  return (
    <>
      <button
        onClick={handleSaveMovie}
        className={className}
        type="button"
        aria-label="Добавить в избранное"
      >
        {children}
      </button>
    </>
  );
}

export default MoviesButton;
