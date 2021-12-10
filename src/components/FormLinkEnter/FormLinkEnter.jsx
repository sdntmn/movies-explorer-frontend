import React from "react";
import { Link } from "react-router-dom";

const FormLinkEnter = function ({ pathLink, text, linkText }) {
  return (
    <div className="form__link-wrapper">
      <p className="form__text">{text}</p>
      <Link to={pathLink} className="form__link">
        {linkText}
      </Link>
    </div>
  );
};

export default FormLinkEnter;
