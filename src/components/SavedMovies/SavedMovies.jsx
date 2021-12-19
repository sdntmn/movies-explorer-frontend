import HeaderProfile from "../Header/HeaderProfile.jsx"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCard from "../MoviesCard/MoviesCard"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"

const SavedMovies = function () {
  return (
    <>
      <div className="page">
        <HeaderProfile />
        <SearchForm />
        <MoviesCardList>
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </MoviesCardList>
      </div>
      <Footer />
    </>
  )
}

export default SavedMovies
