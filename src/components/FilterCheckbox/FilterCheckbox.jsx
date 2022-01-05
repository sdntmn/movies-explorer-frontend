import React from "react";

const FilterCheckbox = function ({ idName }) {
  return (
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
  );
};

export default FilterCheckbox;
