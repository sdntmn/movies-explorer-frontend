import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = function ({ isOpen, arraySaveMovies }) {
  return (
    <>
      <div className="page">
        <SearchForm />
        <MoviesCardList>
          {arraySaveMovies.map((saveMovie) => (
            <MoviesCard
              arraySaveMovies={arraySaveMovies}
              saveMovie={saveMovie}
              key={saveMovie.id}
              movieTitle={saveMovie.nameRU}
              isOpen={isOpen}
              src={saveMovie.image}
              time={saveMovie.duration}
            />
          ))}
        </MoviesCardList>
      </div>
      <Footer />
    </>
  );
};

export default SavedMovies;
