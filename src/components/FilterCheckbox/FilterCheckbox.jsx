import React, { useEffect } from "react";

const FilterCheckbox = function ({
  idName,
  hendleShortFilms,

  shortFilmsSave,
}) {
  useEffect(() => {
    hendleShortFilms();
  }, [hendleShortFilms]);
  console.log(hendleShortFilms);
  return (
    <div className="searchForm__tumb">
      <label>
        <input
          for={`form_${idName}`}
          className="searchForm__tumb-input"
          type="checkbox"
          onClick={hendleShortFilms}
        />
        <span className="searchForm__tumb-span"></span>
      </label>
      <p className="searchForm__tumb-text">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
