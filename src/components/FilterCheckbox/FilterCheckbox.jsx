import React from "react";

const FilterCheckbox = function ({ idName, checkBox }) {
  return (
    <div className="searchForm__tumb">
      <label>
        <input
          for={`form_${idName}`}
          className="searchForm__tumb-input"
          type="checkbox"
          onClick={checkBox}
        />
        <span className="searchForm__tumb-span"></span>
      </label>
      <p className="searchForm__tumb-text">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
