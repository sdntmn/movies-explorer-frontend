import { Link } from "react-router-dom"
import HeaderProfile from "../Header/HeaderProfile.jsx"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCard from "../MoviesCard/MoviesCard"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"

const Movies = function () {
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
  )
}

export default Movies
