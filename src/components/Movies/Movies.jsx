import { React, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

const Movies = function ({
  isOpen,
  arrayMovies,
  isMoviesLoading,
  filter,
  searchMovies,
  lastData,
  onAddCollecnion,
}) {
  console.log(lastData);

  const [inputMovies, setInputMovies] = useState("");

  // Обработчик изменения инпута обновляет стейт
  function handleInputMoies(evt) {
    setInputMovies(evt.target.value);
  }

  const [result, setResult] = useState(lastData);
  console.log(result);

  async function handleSubmit(evt) {
    evt.preventDefault();

    setResult(filtredMovies);
  }

  const filtredMovies = arrayMovies.filter((movie) => {
    return movie.nameRu
      .toLowerCase()
      .trim()
      .includes(inputMovies.toLowerCase().trim());
  });

  /*

  const filtredMovies = useCallback(
    return movie.nameRu
      .toLowerCase()
      .trim()
      .includes(inputMovies.toLowerCase().trim());
      },
      [setResult, searchMovies]
    )
  );
  */

  var sValue = localStorage["lastSearch"] || 0; /* for strings */
  localStorage.setItem("lastSearch", inputMovies);

  let textT = "Ничего не найдено";

  const setLocal = useCallback(() => {
    if (sValue === 0) {
      return (textT = "");
    } else {
      return textT;
    }
  });
  console.log(setLocal());

  //============================= НУЖЕН ЛИ ?
  useEffect(() => {
    if (result.length === 0) {
      setLocal();
    }
  }, [filtredMovies, result, result.length, setLocal, textT]);
  //=============================

  return (
    <>
      <div className="page">
        <SearchForm
          onSubmit={handleSubmit}
          onChange={handleInputMoies}
          value={inputMovies}
          idName="movies"
        />
        {isMoviesLoading && <Preloader></Preloader>}
        {!isMoviesLoading && (
          <MoviesCardList>
            {result.length === 0 ? (
              <span>{textT}</span>
            ) : (
              result.map((movie) => (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  arrayMovies={arrayMovies}
                  movieTitle={movie.nameRu}
                  isOpen={isOpen}
                  src={movie.image}
                  time={movie.duration}
                  onAddCollecnion={onAddCollecnion}
                />
              ))
            )}
          </MoviesCardList>
        )}
        <section className="moviesCard__add">
          <Link
            to=""
            className="moviesCard__button"
            type="button"
            aria-label="Кнопка еще"
          >
            Ещё
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
