import React from "react";

const Input = function ({ inputTitle, inputType, message, idName }) {
  return (
    <div className="form__inputs">
      <span className="form__promp">{inputTitle}</span>
      <input
        className="form__input popup__input_value_link"
        id={`form_${idName}`}
        type={inputType}
        required
      />
      <span className="form__input-error link-input-error">
        Что-то пошло не так...
      </span>
    </div>
  );
};

export default Input;
