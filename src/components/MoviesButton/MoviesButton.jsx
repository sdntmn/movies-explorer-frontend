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
      if (movie. !== 0) {
        setInputResult(true);
      } else {
        setInputResult(false);
      }
    }, [result.length]);
    */

  function handleSaveMovie() {
    console.log(film);

    onAddCollecnion(film);
    setIsSave(true);
  }

  console.log(onAddCollecnion);

  function getDeleteMovie() {
    deletMovie(saveMovie);
  }

  console.log(saveMovie);
  console.log(movie);
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
