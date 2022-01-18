import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FilterCheckbox = function ({
  chengeCheckbox,
  chengeCheckboxSave,
  hendleShortFilms,

  handleChackBoxShortFilmsSave,
}) {
  let locations = useLocation();
  console.log(hendleShortFilms);
  console.log(chengeCheckboxSave);

  return (
    <div className="searchForm__tumb">
      <label>
        {locations.pathname === "/movies" && (
          <input
            className="searchForm__tumb-input"
            type="checkbox"
            id="22"
            onChange={chengeCheckbox}
            name="22"
          />
        )}
        {locations.pathname === "/saved-movies" && (
          <input
            className="searchForm__tumb-input"
            type="checkbox"
            onChange={chengeCheckboxSave}
            id="21"
            name="21"
          />
        )}
        <span className="searchForm__tumb-span"></span>
      </label>
      <p className="searchForm__tumb-text">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
