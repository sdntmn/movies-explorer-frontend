import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

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
  localStorage.getItem("lastSearch");
  localStorage.getItem("shortFilms");
  const [result, setResult] = useState(lastData);
  const [inputResult, setInputResult] = useState(false);

  // Преключение чекбокса является ли короткометражным
  const [checkedShortFilms, setCheckedShortFilms] = useState(true);

  function changeCheckbox() {
    setCheckedShortFilms(!checkedShortFilms);
  }
  console.log(checkedShortFilms);

  // Обработчик изменения инпута обновляет стейт
  handleInputMoies = (evt) => {
    setInputMovies(evt.target.value);
  };

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

    localStorage.setItem("lastSearch", inputMovies);
    if (!checkedShortFilms) {
      localStorage.setItem("shortFilms", checkedShortFilms);
      setResult(resultFilterShortFilmsPutsState);
      setArrayLastSearchMovies(resultFilterShortFilmsPutsState);
    }
    if (checkedShortFilms) {
      localStorage.setItem("shortFilms", checkedShortFilms);
      setResult(resultFilterPutsState);
      setArrayLastSearchMovies(resultFilterPutsState);
      resetCount();
    }
  }

  //=============================
  useEffect(() => {
    if (result.length !== 0) {
      setInputResult(true);
    } else {
      setInputResult(false);
    }
  }, [result.length]);

  const getIs1280 = () => window.innerWidth >= 1040;
  const getIs768 = () => window.innerWidth > 768 && window.innerWidth < 1040;
  const getIs340 = () => window.innerWidth <= 700;

  const [count, setCount] = useState(0);

  // Функция добавления карточек по кнопке "еще"
  function addResultSearch() {
    if (getIs1280()) {
      setCount(count + 3);
    }
    if (getIs768()) {
      setCount(count + 2);
    }
    if (getIs340()) {
      setCount(count + 1);
    }
  }

  function resetCount() {
    if (getIs1280()) {
      setCount(12);
    }
    if (getIs768()) {
      setCount(8);
    }
    if (getIs340()) {
      setCount(5);
    }
  }

  // Первоначальные значения количества карточек при отражении результата

  useEffect(() => {
    function setInitialValue() {
      if (getIs1280()) {
        setCount(12);
      }
      if (getIs768()) {
        setCount(8);
      }
      if (getIs340()) {
        setCount(5);
      }
      return true;
    }
    setInitialValue();
  }, []);

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmit}
          searchChangeMovies={handleInputMoies}
          value={inputMovies}
          changeCheckbox={changeCheckbox}
        />
        {isMoviesLoading && <Preloader></Preloader>}
        {!isMoviesLoading && (
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
          {!inputResult && (
            <span className="moviesCard__text">Ничего не найдено</span>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
