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
// onAddCollecnion - функция добавления в сохраненные для button сохранения
// arraySaveMovies - массив сохраненных фильмов
const Movies = function ({
  isOpen,
  arrayMovies,
  isMoviesLoading,
  setArrayLastSearchMovies,
  lastData,
  onAddCollecnion,
  arraySaveMovies,
}) {
  console.log();
  const [result, setResult] = useState(lastData);
  const [inputMovies, setInputMovies] = useState("");
  const [inputResult, setInputResult] = useState(false);
  const [stateFilterCheckBox, setStateFilterCheckBox] = useState(false);
  let getlastInputData = localStorage.getItem("lastSearch");

  // Обработчик изменения инпута обновляет стейт
  function handleInputMoies(evt) {
    setInputMovies(evt.target.value);
  }

  // Преключение чекбокса
  const handleInChackBox = useCallback(() => {
    setStateFilterCheckBox((state) =>
      state === false
        ? setStateFilterCheckBox(true)
        : setStateFilterCheckBox(false)
    );
  }, []);

  console.log(stateFilterCheckBox);

  const filterInputData = useCallback(
    (movie) => {
      if (
        movie.nameRU
          .toLowerCase()
          .trim()
          .includes(inputMovies.toLowerCase().trim())
      ) {
        return true;
      }
      return false;
    },
    [inputMovies]
  );

  const filterDuration = useCallback((movie) => {
    if (Number.isFinite(movie.duration) && movie.duration <= 45) {
      return true;
    }

    return false;
  }, []);
  // результат поиска
  let resultSearch = arrayMovies.filter(filterInputData);
  // фильтрация результата / короткометражки/
  let arrAllFilter = resultSearch.filter(filterDuration);

  async function handleSubmit(evt) {
    evt.preventDefault();
    localStorage.setItem("lastSearch", inputMovies);
    if (stateFilterCheckBox) {
      setResult(arrAllFilter);
      setArrayLastSearchMovies(arrAllFilter);
    }
    if (!stateFilterCheckBox) {
      setResult(resultSearch);
      setArrayLastSearchMovies(resultSearch);
    }
  }

  console.log(result);
  console.log(inputResult);
  console.log(inputMovies);

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
          onChange={handleInputMoies}
          checkBox={handleInChackBox}
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
                  arraySaveMovies={arraySaveMovies}
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
            <span className="moviesCard__text">Ничего не найдено</span>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
