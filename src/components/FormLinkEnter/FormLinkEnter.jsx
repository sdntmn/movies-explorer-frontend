import React from "react";
import { Link } from "react-router-dom";

const FormLinkEnter = function ({
  isEditState,
  pathLink,
  text,
  linkText,
  btnName,
  onSubmit,
  isDisabled,
  errorsMessage,
}) {
  return (
    <>
      {isEditState ? (
        <div className="form__link-wrapper">
          <p className="form__text-edit">{errorsMessage}</p>
        </div>
      ) : (
        <div className="form__link-wrapper">
          <p className="form__text-edit">{errorsMessage}</p>
        </div>
      )}
      <button
        className={
          isEditState
            ? `form__button-edit
              ${isDisabled && "form__button_disabled"}`
            : `form__button ${isDisabled && "form__button_disabled"}`
        }
        type="submit"
        aria-label={btnName}
        onClick={onSubmit}
        disabled={isDisabled}
      >
        {btnName}
      </button>
      {!isEditState ? (
        <div className="form__link-wrapper">
          <p className="form__text">{text}</p>
          <Link to={pathLink} className="form__link">
            {linkText}
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FormLinkEnter;
