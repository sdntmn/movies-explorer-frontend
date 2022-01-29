import React, { useState, useEffect, useCallback } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = function ({
  isOpen,
  arraySaveMovies,
  lastData,
  shortFilms,
  setInputMovies,
  inputMovies,
  handleInputMoies,
  filterInputData,
  deletMovie,
}) {
  const [saveResult, setSaveResult] = useState(lastData);

  // сосьояние найдено что то или нет
  const [inputResult, setInputResult] = useState(false);

  // Button search
  const [buttonIsDisabledSave, setButtonIsDisabledSave] = useState(false);

  // Переключение чекбокса является ли короткометражным
  const [checkedShortFilmsSave, setCheckedShortFilmsSave] = useState(true);

  function changeCheckboxSave() {
    setCheckedShortFilmsSave(!checkedShortFilmsSave);
  }

  // Обработчик изменения инпута обновляет стейт
  handleInputMoies = (evt) => {
    setInputMovies(evt.target.value);
    if (!!inputMovies) {
      setButtonIsDisabledSave(true);
    }
  };

  const resetFromSave = useCallback(() => {
    setInputMovies("");
    setButtonIsDisabledSave(false);
  }, [setInputMovies]);

  useEffect(() => {
    setButtonIsDisabledSave(!!inputMovies);
  }, [buttonIsDisabledSave, inputMovies]);

  useEffect(() => {
    setSaveResult(arraySaveMovies);
  }, [arraySaveMovies]);

  // Массив результат поиска
  let resultSaveSearch = arraySaveMovies.filter(filterInputData);
  // фильтрация результата / короткометражки/
  let arrAllSaveFilter = resultSaveSearch.filter(shortFilms);

  async function handleSubmitSave(evt) {
    evt.preventDefault();

    setSaveResult(resultSaveSearch);
    resetFromSave();
  }

  //=============================
  useEffect(() => {
    if (saveResult.length !== 0) {
      setInputResult(true);
    } else {
      setInputResult(false);
    }
  }, [saveResult.length]);

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmitSave}
          searchChangeMovies={handleInputMoies}
          changeCheckbox={changeCheckboxSave}
          checked={checkedShortFilmsSave}
          value={inputMovies}
          id="searchSaveMovies"
          buttonIsDisabled={buttonIsDisabledSave}
        />
        {checkedShortFilmsSave && (
          <MoviesCardList>
            {saveResult.map((saveMovie) => (
              <MoviesCard
                key={saveMovie.movieId}
                arraySaveMovies={arraySaveMovies}
                movieTitle={saveMovie.nameRU}
                isOpen={isOpen}
                src={saveMovie.image}
                time={saveMovie.duration}
                saveMovie={saveMovie}
                deletMovie={deletMovie}
              ></MoviesCard>
            ))}
          </MoviesCardList>
        )}
        {!checkedShortFilmsSave && (
          <MoviesCardList>
            {arrAllSaveFilter.map((saveMovie) => (
              <MoviesCard
                key={saveMovie.movieId}
                arraySaveMovies={arraySaveMovies}
                movieTitle={saveMovie.nameRU}
                isOpen={isOpen}
                src={saveMovie.image}
                time={saveMovie.duration}
                saveMovie={saveMovie}
                deletMovie={deletMovie}
              ></MoviesCard>
            ))}
          </MoviesCardList>
        )}
        <section className="moviesCard__add">
          {!inputResult && (
            <span className="moviesCard__text">Ничего не найдено</span>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SavedMovies;
