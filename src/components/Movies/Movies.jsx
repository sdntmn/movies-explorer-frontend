import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

// arrayMovies - все фильмы
// isMoviesLoading - включает прелоадер
// setArrayLastSearchMovies - функция последнего запроса
// lastData = мфссив данных последнего запроса
// onAddCollecnion - handleAddMovi функция добавления в сохраненные для button сохранения
// arraySaveMovies - массив сохраненных фильмов
// isSavedStateMovies - состояние добавлен false или true
const Movies = function ({
  isOpen,
  arrayMovies,
  isMoviesLoading,
  setArrayLastSearchMovies,
  lastData,
  handleCardDelete,
  arraySaveMovies,
  setArraySaveMovies,
  shortFilms,
  arrayMovieIdSaveMovies,
  stateShortFilms,
  setInputMovies,
  inputMovies,
  handleInputMoies,
  filterInputData,
}) {
  const [result, setResult] = useState(lastData);
  const [inputResult, setInputResult] = useState(false);
  let getlastInputData = localStorage.getItem("lastSearch");

  // Преключение чекбокса является ли короткометражным
  const [checkedShortFilms, setCheckedShortFilms] = useState(true);

  function chengeCheckbox() {
    setCheckedShortFilms(!checkedShortFilms);
  }

  // Переключение состояния кнопки
  const [hendleAddOrDelete, setHendleAddOrDelete] = useState(false);
  // Массив результата поиска
  let resultSearch = arrayMovies.filter(filterInputData);
  //Фильтрация на сохранен ли в коллекции  или нет массива resultSearch?
  let resultFilterPutsState = resultSearch.filter((movie) => {
    let stateInCollection = arrayMovieIdSaveMovies.some(
      (el) => el === movie.movieId
    );
    movie.state = stateInCollection;
    return movie;
  });

  console.log(result);
  // Фильтрация результата / короткометражки/
  let resultFilterShortFilms = resultSearch.filter(shortFilms);
  //Фильтрация массива resultFilterShortFilms - в коллекции или нет?
  let resultFilterShortFilmsPutsState = resultFilterShortFilms.filter(
    (movie) => {
      let stateInCollection = arrayMovieIdSaveMovies.some(
        (el) => el === movie.movieId
      );
      movie.state = stateInCollection;
      return movie;
    }
  );

  // Обработчик изменения инпута обновляет стейт
  handleInputMoies = (evt) => {
    setInputMovies(evt.target.value);
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    localStorage.setItem("lastSearch", inputMovies);
    if (!checkedShortFilms) {
      setResult(resultFilterShortFilmsPutsState);
      setArrayLastSearchMovies(resultFilterShortFilmsPutsState);
    }
    if (checkedShortFilms) {
      setResult(resultFilterPutsState);
      setArrayLastSearchMovies(resultFilterPutsState);
    }
  }

  //============================= НУЖЕН ЛИ ?
  useEffect(() => {
    if (result.length !== 0) {
      setInputResult(true);
    } else {
      setInputResult(false);
    }
  }, [result.length]);

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmit}
          searchChangeMovies={handleInputMoies}
          value={inputMovies}
          chengeCheckbox={chengeCheckbox}
        />
        {isMoviesLoading && <Preloader></Preloader>}
        {!isMoviesLoading && (
          <MoviesCardList>
            {inputResult &&
              result.map((film) => (
                <MoviesCard
                  arraySaveMovies={arraySaveMovies}
                  key={film.movieId}
                  movieTitle={film.nameRU}
                  isOpen={isOpen}
                  src={film.image}
                  time={film.duration}
                  film={film}
                ></MoviesCard>
              ))}
          </MoviesCardList>
        )}
        <section className="moviesCard__add" key={Math.random()}>
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
            <span className="moviesCard__text">Ничего не найдено</span>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
