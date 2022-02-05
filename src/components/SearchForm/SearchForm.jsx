import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = function ({
  shortFilmsSave,
  changeCheckbox,
  value,
  onSubmit,

  searchChangeMovies,
  checked,
  id,
  buttonIsDisabled = false,
  setButtonIsDisabled,
}) {
  return (
    <div className="searchForm">
      <form className="searchForm__section">
        <div className="searchForm__movies">
          <input
            className="searchForm__movies-input"
            onChange={searchChangeMovies}
            value={value}
            type="text"
            placeholder="Фильм"
            id={id}
            required
          />
          <button
            onClick={onSubmit}
            className={`searchForm__movies-button ${
              !buttonIsDisabled && "searchForm__movies-button-disabled"
            }`}
            type="submit"
          >
            Поиск
          </button>
        </div>
        <FilterCheckbox
          shortFilmsSave={shortFilmsSave}
          changeCheckbox={changeCheckbox}
          checked={checked}
        />
      </form>
    </div>
  );
};

export default SearchForm;
