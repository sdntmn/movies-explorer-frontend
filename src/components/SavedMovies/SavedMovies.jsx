import HeaderProfile from "../Header/HeaderProfile.jsx"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCard from "../MoviesCard/MoviesCard"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"

import pathDeleteIcon from "../../images/delete-movie.svg"
import MoviesButton from "../Movies/MoviesButton"

const SavedMovies = function () {
  return (
    <>
      <div className="page">
        <HeaderProfile />
        <SearchForm />
        <MoviesCardList>
          <MoviesCard>
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
  )
}

export default SavedMovies
