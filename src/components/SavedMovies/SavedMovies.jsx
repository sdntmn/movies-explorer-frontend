import React, { useState, useEffect } from "react";
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

    if (stateShortFilms) {
      setSaveResult(arrAllSaveFilter);
      setArrayLastSearchMovies(arrAllSaveFilter);
    }
    if (!stateShortFilms) {
      setSaveResult(resultSaveSearch);
      setArrayLastSearchMovies(resultSaveSearch);
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
          onChange={handleInputMoies}
          hendleShortFilms={hendleShortFilms}
          value={inputMovies}
        />
        <MoviesCardList>
          {saveResult.map((saveMovie) => (
            <MoviesCard
              arraySaveMovies={arraySaveMovies}
              key={saveMovie.movieId}
              movieTitle={saveMovie.nameRU}
              isOpen={isOpen}
              src={saveMovie.image}
              time={saveMovie.duration}
            >
              <MoviesButton
                deletMovie={deletMovie}
                saveMovie={saveMovie}
                className="element__button-not-active"
              >
                <img
                  className="element__icon"
                  src={pathDeleteIcon}
                  alt="иконка сохранения"
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
