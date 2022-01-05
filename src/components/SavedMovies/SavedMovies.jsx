import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import pathDeleteIcon from "../../images/delete-movie.svg";
import MoviesButton from "../MoviesButton/MoviesButton";

const SavedMovies = function ({ isOpen }) {
  return (
    <>
      <div className="page">
        <SearchForm />
        <MoviesCardList>
          <MoviesCard isOpen={isOpen}>
            <MoviesButton className={"element__button-not-active"}>
              <img
                className="element__icon"
                src={pathDeleteIcon}
                alt="иконка сохранения"
              />
            </MoviesButton>
          </MoviesCard>
          <MoviesCard isOpen={isOpen}>
            <MoviesButton className={"element__button-not-active"}>
              <img
                className="element__icon"
                src={pathDeleteIcon}
                alt="иконка сохранения"
              />
            </MoviesButton>
          </MoviesCard>
        </MoviesCardList>
      </div>
      <Footer />
    </>
  );
};

export default SavedMovies;
