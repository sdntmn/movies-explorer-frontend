import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = function ({ idName }) {
  return (
    <div className="searchForm">
      <form className="searchForm__section">
        <div className="searchForm__movies">
          <input
            className="searchForm__movies-input"
            type="text"
            placeholder="Фильм"
            id={`form_${idName}`}
          />
          <button className="searchForm__movies-button" type="submit">
            Поиск
          </button>
        </div>
        <FilterCheckbox />
      </form>
    </div>
  );
};

export default SearchForm;
