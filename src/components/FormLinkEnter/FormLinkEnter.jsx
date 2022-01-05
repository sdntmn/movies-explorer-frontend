import React from "react";
import { Link } from "react-router-dom";

const FormLinkEnter = function ({
  pathLink,
  text,
  linkText,
  btnName,
  onClick,
  isEditState,
}) {
  return (
    <>
      {isEditState ? (
        <div className="form__link-wrapper">
        <p className="form__text-edit">При обновлении профиля произошла ошибка.</p>
      </div>):("")}
      <button
        className=
        {isEditState ? "form__button-edit" : "form__button"}
        type="submit" 
        aria-label={btnName}
        onClick={onClick}
      >
        {btnName}
      </button>
      {!isEditState ? (<div className="form__link-wrapper">
        <p className="form__text">{text}</p>
        <Link to={pathLink} className="form__link">
          {linkText}
        </Link>
      </div>):("")}
      
    </>
  );
};

export default FormLinkEnter;
