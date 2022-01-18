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
  /*
  useEffect(() => {
    setArraySaveMovies(arraySaveMovies);
  }, [arraySaveMovies, setArraySaveMovies]);

  const addMovie = movie.movieId.some((i) => i.duration === arraySaveMovies.moviedId);
  const cardLikeButtonClassName = `card__like-button ${
    addMovie && "card__like-button_is-active"
  }`;





  useEffect(() => {
    setArraySaveMovies();
  }, [setArraySaveMovies]);
   */

  //console.log(film.state);

  function handleSavedOrDelet() {
    console.log(film);
    if (film.state) {
      onAddCollecnion(film);
      setIsSave(false);
    }
    if (!film.state) {
      onAddCollecnion(film);
      setIsSave(true);
    }
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
          key={Math.random()}
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
