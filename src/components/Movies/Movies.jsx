import React, { useState, useEffect, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { useCurrentWidth } from "../../hooks/useCurrentWidth";

//isOpen - для смены фона
// arrayMovies - все фильмы
// isMoviesLoading - включает прелоадер
// setArrayLastSearchMovies - функция последнего запроса
// lastData = массив данных последнего запроса
// onAddCollecnion - handleAddMovi функция добавления в сохраненные для button сохранения
// isSavedStateMovies - состояние добавлен false или true
// arrayMovieIdSaveMovies - moviesId сохраненных фильмов
// shortFilms- функция фильтрации короткометражек
// setInputMovies - обработка инпута
// inputMovies - запрос в инпуте
// handleAddMovie - сохранение в коллекцию
// arraySaveMovies - массив сохраненных фильмов
// setArraySaveMovies - сохранения в
const Movies = function ({
  isOpen,
  arrayMovies,
  isMoviesLoading,
  setArrayLastSearchMovies,
  lastData,
  lastDataShortFilms,
  arraySaveMovies,
  shortFilms,
  setInputMovies,
  inputMovies,
  handleInputMoies,
  filterInputData,
  handleAddMovie,
  setArraySaveMovies,
  deletMovie,
}) {
  let lastSearch = localStorage.getItem("lastSearch");

  // получение состояния переключателя checkBox
  let localShortFilms =
    localStorage.getItem("shortFilms") === "true" ? true : false;

  // Button search
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  // результат поиска
  const [result, setResult] = useState(lastData);
  // результат поиска короткометражек
  const [resultShortFilms, setResultSortFilms] = useState(lastDataShortFilms);
  // сосьояние найдено что то или нет
  const [inputResult, setInputResult] = useState(false);

  // Преключение чекбокса является ли короткометражным
  const [checkedShortFilms, setCheckedShortFilms] = useState(!localShortFilms);
  // установка состояния checkBox
  localStorage.setItem("shortFilms", checkedShortFilms);

  function changeCheckbox() {
    setCheckedShortFilms(!checkedShortFilms);
  }

  // Обработчик изменения инпута обновляет стейт
  handleInputMoies = (evt) => {
    setInputMovies(evt.target.value);
    if (!!inputMovies) {
      setButtonIsDisabled(true);
    }
  };

  const resetFrom = useCallback(() => {
    setInputMovies("");
    setButtonIsDisabled(false);
  }, [setInputMovies]);

  useEffect(() => {
    setButtonIsDisabled(!!inputMovies);
  }, [buttonIsDisabled, inputMovies]);

  // Массив результата поиска
  let resultSearch = arrayMovies.filter(filterInputData);
  //Фильтрация на сохранен ли в коллекции  или нет массива resultSearch?
  let resultFilterPutsState = resultSearch.filter((movie) => {
    let stateInCollection = arraySaveMovies.some(
      (el) => el.movieId === movie.movieId
    );
    movie.state = stateInCollection;
    return movie;
  });

  // Фильтрация результата / короткометражки/
  let resultFilterShortFilms = resultSearch.filter(shortFilms);
  //Фильтрация массива resultFilterShortFilms - в коллекции или нет?
  let resultFilterShortFilmsPutsState = resultFilterShortFilms.filter(
    (movie) => {
      let stateInCollection = arraySaveMovies.some(
        (el) => el.movieId === movie.movieId
      );
      movie.state = stateInCollection;
      return movie;
    }
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

    setButtonIsDisabled(true);
    localStorage.setItem("lastSearch", inputMovies);
    setResult(resultFilterPutsState);
    setArrayLastSearchMovies(resultFilterPutsState);

    resetCount();

    setResultSortFilms(resultFilterShortFilmsPutsState);
    setArrayLastSearchMovies(resultFilterShortFilmsPutsState);
    resetFrom();
  }

  //=============================
  useEffect(() => {
    if (result.length !== 0) {
      setInputResult(true);
    } else {
      setInputResult(false);
    }
  }, [result.length]);

  let width = useCurrentWidth();

  const getIs1280 = useCallback(() => width >= 1040, [width]);
  const getIs768 = useCallback(() => width > 768 && width < 1040, [width]);
  const getIs340 = useCallback(() => width <= 700, [width]);

  const [count, setCount] = useState(lastData.length);

  // Функция добавления карточек по кнопке "еще"
  const addResultSearch = useCallback(() => {
    if (getIs1280()) {
      setCount(count + 3);
    }
    if (getIs768()) {
      setCount(count + 2);
    }
    if (getIs340()) {
      setCount(count + 1);
    }
  }, [count, getIs1280, getIs340, getIs768]);

  const resetCount = useCallback(() => {
    if (getIs1280()) {
      setCount(12);
    }
    if (getIs768()) {
      setCount(8);
    }
    if (getIs340()) {
      setCount(5);
    }
  }, [getIs1280, getIs340, getIs768]);

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmit}
          searchChangeMovies={handleInputMoies}
          value={inputMovies}
          changeCheckbox={changeCheckbox}
          checked={checkedShortFilms}
          id="searchMovies"
          buttonIsDisabled={buttonIsDisabled}
          setButtonIsDisabled={setButtonIsDisabled}
        />
        {isMoviesLoading && <Preloader></Preloader>}
        {!isMoviesLoading && !checkedShortFilms && (
          <MoviesCardList>
            {inputResult &&
              result
                .slice(0, count)
                .map((film) => (
                  <MoviesCard
                    arraySaveMovies={arraySaveMovies}
                    setArraySaveMovies={setArraySaveMovies}
                    key={film.movieId}
                    movieTitle={film.nameRU}
                    isOpen={isOpen}
                    src={film.image}
                    time={film.duration}
                    trailer={film.trailer}
                    movie={film}
                    handleAddMovie={handleAddMovie}
                    deletMovie={deletMovie}
                  />
                ))}
          </MoviesCardList>
        )}
        {!isMoviesLoading && checkedShortFilms && (
          <MoviesCardList>
            {inputResult &&
              resultShortFilms
                .slice(0, count)
                .map((film) => (
                  <MoviesCard
                    arraySaveMovies={arraySaveMovies}
                    setArraySaveMovies={setArraySaveMovies}
                    key={film.movieId}
                    movieTitle={film.nameRU}
                    isOpen={isOpen}
                    src={film.image}
                    time={film.duration}
                    trailer={film.trailer}
                    movie={film}
                    handleAddMovie={handleAddMovie}
                    deletMovie={deletMovie}
                  />
                ))}
          </MoviesCardList>
        )}
        <section className="moviesCard__add">
          {inputResult && result.length > count && result.length >= count && (
            <button
              className="moviesCard__button"
              type="button"
              aria-label="Кнопка еще"
              onClick={addResultSearch}
            >
              Ещё доступно + {result.length - count}
            </button>
          )}
          {!inputResult && !!lastSearch && !inputMovies && (
            <span className="moviesCard__text">Ничего не найдено</span>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
