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
  const [result, setResult] = useState(lastData);
  const [inputResult, setInputResult] = useState(false);

  let getlastInputData = localStorage.getItem("lastSearch");

  // Преключение чекбокса является ли короткометражным
  const [checkedShortFilms, setCheckedShortFilms] = useState(true);

  function chengeCheckbox() {
    setCheckedShortFilms(!checkedShortFilms);
  }

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
  /*
  let removed;
  async function addResult(e) {
    e.preventDefault();
    let count = 3;
    removed = count;
    return count + 3;
  }
  console.log(removed);
  console.log(addResult());
  */

  async function handleSubmit(evt) {
    evt.preventDefault();

    localStorage.setItem("lastSearch", inputMovies);
    if (!checkedShortFilms) {
      setResult(resultFilterShortFilmsPutsState);
      setArrayLastSearchMovies(resultFilterShortFilmsPutsState);
    }
    if (checkedShortFilms) {
      setCount(3);
      setResult(resultFilterPutsState);
      setArrayLastSearchMovies(resultFilterPutsState);
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
  console.log(result.length);

  const [count, setCount] = useState(3);

  /*useEffect(() => {
    setCount(result.length);
  }, [result.length]);
*/
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
          {inputResult && result.length > 3 && result.length >= count && (
            <button
              className="moviesCard__button"
              type="button"
              aria-label="Кнопка еще"
              onClick={() => setCount(count + 3)}
            >
              Ещё
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
