import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = function ({ isOpen, isSaveMovies }) {
  return (
    <>
      <div className="page">
        <SearchForm />
        <MoviesCardList>
          {isSaveMovies.map((movie) => (
            <MoviesCard
              isSaveMovies={isSaveMovies}
              movie={movie}
              key={movie.id}
              movieTitle={movie.nameRU}
              isOpen={isOpen}
              src={movie.image}
              time={movie.duration}
            />
          ))}
        </MoviesCardList>
      </div>
      <Footer />
    </>
  );
};

export default SavedMovies;
