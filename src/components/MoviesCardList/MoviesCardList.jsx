import React from "react";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = function ({ children }) {
  return (
    <>
      <section className="moviesCardList">
        {children ? <ul className="elements">{children}</ul> : <Preloader />}
      </section>
    </>
  );
};

export default MoviesCardList;
