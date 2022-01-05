import { useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoviesButton from "../MoviesButton/MoviesButton";
import exportIconPath from "../../images/export icon.svg";

const Movies = function ({ isOpen }) {
  const [savedIn, setSavedIn] = useState(false);

  function savedInMovies() {
    setSavedIn((state) =>
      state === false ? setSavedIn(true) : setSavedIn(false)
    );
  }
  return (
    <>
      <div className="page">
        <SearchForm />
        <MoviesCardList>
          <MoviesCard isOpen={isOpen}>
            <MoviesButton
              onClick={savedInMovies}
              className={
                savedIn
                  ? "element__button-not-active"
                  : "element__button-active"
              }
            >
              {savedIn ? (
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
        </MoviesCardList>
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
