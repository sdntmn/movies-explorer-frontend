import React from "react";
import { useLocation } from "react-router-dom";

const FilterCheckbox = function ({ changeCheckbox, changeCheckboxSave }) {
  let locations = useLocation();

  return (
    <div className="searchForm__tumb">
      <label>
        {locations.pathname === "/movies" && (
          <input
            className="searchForm__tumb-input"
            type="checkbox"
            onChange={changeCheckbox}
            name="checkBoxMovies"
          />
        )}
        {locations.pathname === "/saved-movies" && (
          <input
            className="searchForm__tumb-input"
            type="checkbox"
            onChange={changeCheckboxSave}
            name="checkBoxSaveMovies"
          />
        )}
        <span className="searchForm__tumb-span"></span>
      </label>
      <p className="searchForm__tumb-text">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
