import React from "react"

const SearchForm = function ({ inputTitle, inputType, message, idName }) {
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
        <div className="searchForm__tumb">
          <label>
            <input
              for={`form_${idName}`}
              className="searchForm__tumb-input"
              type="checkbox"
            />
            <span className="searchForm__tumb-span"></span>
          </label>
          <p className="searchForm__tumb-text">Короткометражки</p>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
