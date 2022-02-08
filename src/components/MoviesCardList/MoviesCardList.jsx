import React from "react";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = function ({ children, isLoading }) {
  return (
    <>
      <section className="moviesCardList">
        {isLoading && children && <Preloader></Preloader>}
        {children && <ul className="elements">{children}</ul>}
      </section>
    </>
  );
};

export default MoviesCardList;
