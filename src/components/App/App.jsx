import Header from "../Main/Header";
import Promo from "../Main/Promo";
import AboutProject from "../Main/AboutProject";
import Techs from "../Main/Techs";
import AboutMe from "../Main/AboutMe";
import Footer from "../Main/Footer";

const App = function () {
  return (
    <div className='root'>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </div>
  );
};

export default App;
