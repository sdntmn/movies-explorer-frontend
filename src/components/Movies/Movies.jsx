import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

const Movies = function ({
  isOpen,
  arrayMovies,
  isMoviesLoading,
  setArrayLastSearchMovies,
  lastData,
  onAddCollecnion,
}) {
  const [result, setResult] = useState(lastData);
  const [inputMovies, setInputMovies] = useState("");
  const [inputResult, setInputResult] = useState(false);
  const [stateFilterCheckBox, setStateFilterCheckBox] = useState(false);
  let getlastInputData = localStorage.getItem("lastSearch");
  console.log(inputResult);
  console.log(result.length);

  // Преключение чекбокса
  const handleInChackBox = useCallback(() => {
    setStateFilterCheckBox(true);
  });

  const handleOffChackBox = useCallback(() => {
    setStateFilterCheckBox(false);
  });

  // Обработчик изменения инпута обновляет стейт
  function handleInputMoies(evt) {
    setInputMovies(evt.target.value);
  }

  const time = 45;

  //console.log(lastData);

  async function handleSubmit(evt) {
    evt.preventDefault();
    localStorage.setItem("lastSearch", inputMovies);
    setResult(filtredMovies);
    setArrayLastSearchMovies(filtredMovies);
  }

  useEffect(() => {});
  // поиск по массиву
  let filtredMovies = arrayMovies.filter((movie) => {
    return movie.nameRU
      .toLowerCase()
      .trim()
      .includes(inputMovies.toLowerCase().trim());
  });

  //============================= НУЖЕН ЛИ ?
  useEffect(() => {
    if (lastData.length !== 0 || result.length !== 0) {
      setInputResult(true);
    }
  }, [lastData.length, result.length]);

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmit}
          onChange={handleInputMoies}
          value={inputMovies}
          idName="movies"
        />
        {isMoviesLoading && <Preloader></Preloader>}
        {!isMoviesLoading && (
          <MoviesCardList>
            {inputResult &&
              result.map((movie) => (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  arrayMovies={arrayMovies}
                  movieTitle={movie.nameRU}
                  isOpen={isOpen}
                  src={movie.image}
                  time={movie.duration}
                  onAddCollecnion={onAddCollecnion}
                />
              ))}
          </MoviesCardList>
        )}
        <section className="moviesCard__add">
          {inputResult ? (
            <Link
              to=""
              className="moviesCard__button"
              type="button"
              aria-label="Кнопка еще"
            >
              Ещё
            </Link>
          ) : (
            <span>Ничего не найдено</span>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
