import React from "react";
import { Link } from "react-router-dom";

const FormLinkEnter = function ({
  pathLink,
  text,
  linkText,
  btnName,
  sylesSection,
}) {
  return (
    <div className={sylesSection}>
      <button
        type='submit'
        className='form__button'
        aria-label='Зарегистрироваться'>
        {btnName}
      </button>
      <div className='form__link-wrapper'>
        <p className='form__text'>{text}</p>
        <Link to={pathLink} className='form__link'>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default FormLinkEnter;
