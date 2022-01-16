import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MoviesButton from "../MoviesButton/MoviesButton";
import exportIconPath from "../../images/export_icon.svg";

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
  onAddCollecnion,
  arraySaveMovies,
  shortFilms,
  hendleShortFilms,
  stateShortFilms,
  setInputMovies,
  inputMovies,
  handleInputMoies,
  filterInputData,
}) {
  const [result, setResult] = useState(lastData);
  const [inputResult, setInputResult] = useState(false);
  let getlastInputData = localStorage.getItem("lastSearch");

  // Обработчик изменения инпута обновляет стейт
  handleInputMoies = (evt) => {
    setInputMovies(evt.target.value);
  };

  // результат поиска
  let resultSearch = arrayMovies.filter(filterInputData);
  // фильтрация результата / короткометражки/
  let arrAllFilter = resultSearch.filter(shortFilms);

  async function handleSubmit(evt) {
    evt.preventDefault();
    localStorage.setItem("lastSearch", inputMovies);
    if (stateShortFilms) {
      res();
      setResult(filterResultSave);
      setArrayLastSearchMovies(filterResultSave);
    }
    if (!stateShortFilms) {
      res();
      setResult(filterResultSave);
      setArrayLastSearchMovies(filterResultSave);
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

  let positiveArr = arraySaveMovies.map(function (number) {
    return number.movieId;
  });

  let filterResultSave = resultSearch;

  function res() {
    let filterResultSave = resultSearch.filter((movie) => {
      let stateInCollection = positiveArr.some((el) => el === movie.movieId);

      movie.state = stateInCollection;

      return movie;
    });

    return filterResultSave;
  }

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmit}
          onChange={handleInputMoies}
          hendleShortFilms={hendleShortFilms}
          value={inputMovies}
        />
        {isMoviesLoading && <Preloader></Preloader>}
        {!isMoviesLoading && (
          <MoviesCardList>
            {inputResult &&
              result.map((movie) => (
                <>
                  <MoviesCard
                    key={movie.movieId}
                    movie={movie}
                    movieTitle={movie.nameRU}
                    isOpen={isOpen}
                    src={movie.image}
                    time={movie.duration}
                  >
                    <MoviesButton
                      onAddCollecnion={onAddCollecnion}
                      movie={movie}
                      arrayMovies={arrayMovies}
                      className={
                        !movie.state
                          ? "element__button-not-active"
                          : "element__button-active"
                      }
                    >
                      {!movie.state ? (
                        "Сохранить"
                      ) : (
                        <img
                          className="element__icon"
                          src={exportIconPath}
                          alt="иконка сохранения"
                        />
                      )}
                    </MoviesButton>
                  </MoviesCard>
                </>
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
            <span className="moviesCard__text">Ничего не найдено</span>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
