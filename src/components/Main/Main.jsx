import Promo from "./Promo"
import AboutProject from "./AboutProject"
import Techs from "./Techs"
import AboutMe from "./AboutMe"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"

const Main = function () {
  return (
    <>
      <Header styles="root__cover" stylesHider="header">
        <div className="header__nav">
          <Navigation
            pathLink="/register"
            styles="header__link"
            textLink="Регистрация"
          ></Navigation>
          <Navigation
            pathLink="/login"
            styles="header__button root__color-green"
            textLink="Войти"
          ></Navigation>
        </div>
      </Header>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </>
  )
}

export default Main
