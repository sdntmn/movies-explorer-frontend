import React, { useState, useEffect, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { useCurrentWidth } from "../../hooks/useCurrentWidth";
import {
  DESKTOP,
  TABLET,
  MOBILE_ADD_MORE,
  TABLET_ADD_MORE,
  DESKTOP_ADD_MORE,
  DESKTOP_INITIALLY_AMOUNT,
  TABLET_INITIALLY_AMOUNT,
  MOBILE_INITIALLY_AMOUNT,
} from "../../utils/config";

const Movies = function ({
  isOpen,
  arrayMovies,
  isMoviesLoading,
  setArrayLastSearchMovies,
  arraySaveMovies,
  shortFilms,
  handleAddMovie,
  setArraySaveMovies,
  deleteMovie,
  lastData,
  lastDataShortFilms,
  setIsLastData,
}) {
  let lastSearch = localStorage.getItem("lastSearch");
  let lastStateShortFilms = JSON.parse(
    localStorage.getItem("handlerCheckedBox")
  );
  let countMovies = JSON.parse(localStorage.getItem("countMovies"));

  const [inputSearch, setInputSearch] = useState(lastSearch || "");

  // Button search
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  // состояние найдено что то или нет
  const [inputResult, setInputResult] = useState(false);

  const [initiallyNumberCards, setInitiallyNumberCards] = useState(countMovies);

  // Переключение чекбокса является ли короткометражным
  const [checkedShortFilms, setCheckedShortFilms] = useState(
    lastStateShortFilms || false
  );

  function changeCheckbox() {
    setCheckedShortFilms(!checkedShortFilms);
  }

  // Обработчик изменения инпута обновляет стейт
  const handleInputSearch = (evt) => {
    setInputSearch(evt.target.value);
    if (!!inputSearch) {
      setButtonIsDisabled(true);
    }
  };

  const filterInputData = useCallback(
    (movie) => {
      if (
        movie.nameRU
          .toLowerCase()
          .trim()
          .includes(inputSearch.toLowerCase().trim())
      ) {
        return true;
      }
      return false;
    },
    [inputSearch]
  );

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

  // результат поиска
  const [result, setResult] = useState(lastData);

  // результат поиска короткометражек
  const [resultShortFilms, setResultSortFilms] = useState(lastDataShortFilms);

  const resetFrom = useCallback(() => {
    setButtonIsDisabled(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("handlerCheckedBox", checkedShortFilms);
    localStorage.setItem("countMovies", initiallyNumberCards);
    setButtonIsDisabled(!!inputSearch);
    setIsLastData(lastSearch);
  }, [
    buttonIsDisabled,
    checkedShortFilms,
    initiallyNumberCards,
    inputSearch,
    lastSearch,
    setIsLastData,
  ]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    setButtonIsDisabled(true);
    // результат поиска с фильтрацией сохраненных фильмов
    setResult(resultFilterPutsState);
    //сохранение массива последнего запроса
    setArrayLastSearchMovies(resultFilterPutsState);
    // сохранение массива короткометражек
    setResultSortFilms(resultFilterShortFilmsPutsState);
    localStorage.setItem("lastSearch", inputSearch);
    resetFrom();
    resetCount();
  }

  //=============================
  useEffect(() => {
    if (result.length || lastData.length !== 0) {
      setInputResult(true);
      setResult(lastData);
      setResultSortFilms(lastDataShortFilms);
    } else {
      setInputResult(false);
    }
  }, [lastData, lastData.length, lastDataShortFilms, result.length]);

  let width = useCurrentWidth();

  const getScreenSize1280 = useCallback(() => width >= DESKTOP, [width]);
  const getScreenSize768 = useCallback(
    () => width > TABLET && width < DESKTOP,
    [width]
  );
  const getScreenSize340 = useCallback(() => width <= TABLET, [width]);

  // Функция добавления карточек по кнопке "еще"
  const addResultSearch = useCallback(() => {
    if (getScreenSize1280()) {
      setInitiallyNumberCards(initiallyNumberCards + DESKTOP_ADD_MORE);
    }
    if (getScreenSize768()) {
      setInitiallyNumberCards(initiallyNumberCards + TABLET_ADD_MORE);
    }
    if (getScreenSize340()) {
      setInitiallyNumberCards(initiallyNumberCards + MOBILE_ADD_MORE);
    }
  }, [
    initiallyNumberCards,
    getScreenSize1280,
    getScreenSize340,
    getScreenSize768,
  ]);

  const resetCount = useCallback(() => {
    if (getScreenSize1280()) {
      setInitiallyNumberCards(DESKTOP_INITIALLY_AMOUNT);
    }
    if (getScreenSize768()) {
      setInitiallyNumberCards(TABLET_INITIALLY_AMOUNT);
    }
    if (getScreenSize340()) {
      setInitiallyNumberCards(MOBILE_INITIALLY_AMOUNT);
    }
  }, [getScreenSize1280, getScreenSize340, getScreenSize768]);

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmit}
          searchChangeMovies={handleInputSearch}
          value={inputSearch}
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
                .slice(0, initiallyNumberCards)
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
                    deleteMovie={deleteMovie}
                  />
                ))}
          </MoviesCardList>
        )}

        {!isMoviesLoading && checkedShortFilms && (
          <MoviesCardList>
            {inputResult &&
              resultShortFilms
                .slice(0, initiallyNumberCards)
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
                    deleteMovie={deleteMovie}
                  />
                ))}
          </MoviesCardList>
        )}
        <section className="moviesCard__add">
          {inputResult &&
            result.length > initiallyNumberCards &&
            result.length >= initiallyNumberCards &&
            !checkedShortFilms && (
              <button
                className="moviesCard__button"
                type="button"
                aria-label="Кнопка еще"
                onClick={addResultSearch}
              >
                Ещё доступно + {result.length - initiallyNumberCards}
              </button>
            )}
          {!inputResult && !(lastSearch === null) && (
            <span className="moviesCard__text">Ничего не найдено</span>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
