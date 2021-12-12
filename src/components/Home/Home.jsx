import Promo from "../Main/Promo";
import AboutProject from "../Main/AboutProject";
import Techs from "../Main/Techs";
import AboutMe from "../Main/AboutMe";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

const Home = function () {
  return (
    <>
      <Header styles='root__cover' stylesHider='header'>
        <div className='header__nav'>
          <Navigation
            pathLink='/register'
            styles='header__link'
            textLink='Регистрация'></Navigation>
          <Navigation
            pathLink='/login'
            styles='header__button root__color-green'
            textLink='Войти'></Navigation>
        </div>
      </Header>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </>
  );
};

export default Home;
