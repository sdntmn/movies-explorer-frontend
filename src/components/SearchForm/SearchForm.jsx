import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = function ({ idName, onChange, value, onSubmit }) {
  return (
    <div className="searchForm">
      <form className="searchForm__section">
        <div className="searchForm__movies">
          <input
            className="searchForm__movies-input"
            onChange={onChange}
            value={value}
            type="text"
            placeholder="Фильм"
            id={`form_${idName}`}
            required
          />
          <button
            onClick={onSubmit}
            className="searchForm__movies-button"
            type="submit"
          >
            Поиск
          </button>
        </div>
        <FilterCheckbox />
      </form>
    </div>
  );
};

export default SearchForm;
