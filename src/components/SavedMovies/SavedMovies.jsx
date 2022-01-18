import React, { useState, useEffect, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesButton from "../MoviesButton/MoviesButton";
import Footer from "../Footer/Footer";
import pathDeleteIcon from "../../images/delete-movie.svg";

const SavedMovies = function ({
  isOpen,
  arraySaveMovies,
  arrayMovies,
  setArrayLastSearchMovies,
  onAddCollecnion,
  lastData,
  shortFilms,
  hendleShortFilms,
  stateShortFilms,
  setInputMovies,
  inputMovies,
  handleInputMoies,
  filterInputData,
  deletMovie,
}) {
  const [saveResult, setSaveResult] = useState(lastData);
  const [inputSaveResult, setInputSaveResult] = useState(false);

  console.log(shortFilms);
  // Преключение чекбокса
  // Преключение чекбокса является ли короткометражным
  const [checkedShortFilmsSave, setCheckedShortFilmsSave] = useState(true);

  function chengeCheckboxSave() {
    setCheckedShortFilmsSave(!checkedShortFilmsSave);
  }

  // Обработчик изменения инпута обновляет стейт
  handleInputMoies = (evt) => {
    setInputMovies(evt.target.value);
  };

  useEffect(() => {
    setSaveResult(arraySaveMovies);
  }, [arraySaveMovies]);

  // результат поиска
  let resultSaveSearch = arraySaveMovies.filter(filterInputData);
  // фильтрация результата / короткометражки/
  let arrAllSaveFilter = resultSaveSearch.filter(shortFilms);

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (!checkedShortFilmsSave) {
      setSaveResult(arrAllSaveFilter);
      //setArrayLastSearchMovies(arrAllSaveFilter);
    }
    if (checkedShortFilmsSave) {
      setSaveResult(resultSaveSearch);
      //setArrayLastSearchMovies(resultSaveSearch);
    }
  }

  //============================= НУЖЕН ЛИ ?
  useEffect(() => {
    if (saveResult.length !== 0) {
      setInputSaveResult(true);
    } else {
      setInputSaveResult(false);
    }
  }, [saveResult.length]);

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmit}
          searchChangeMovies={handleInputMoies}
          chengeCheckboxSave={chengeCheckboxSave}
          value={inputMovies}
        />
        <MoviesCardList>
          {saveResult.map((saveMovie) => (
            <MoviesCard
              key={saveMovie.movieId}
              arraySaveMovies={arraySaveMovies}
              movieTitle={saveMovie.nameRU}
              isOpen={isOpen}
              src={saveMovie.image}
              time={saveMovie.duration}
              film={saveMovie}
            >
              <MoviesButton
                arraySaveMovies={arraySaveMovies}
                deletMovie={deletMovie}
                saveMovie={saveMovie}
                className="element__button-not-active"
              >
                <img
                  className="element__icon"
                  src={pathDeleteIcon}
                  alt="иконка удаления"
                />
              </MoviesButton>
            </MoviesCard>
          ))}
        </MoviesCardList>
      </div>
      <Footer />
    </>
  );
};

export default SavedMovies;
