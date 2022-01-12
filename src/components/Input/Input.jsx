import React from "react";

const Input = function ({
  inputTitle,
  inputType,
  message,
  idName,
  onChange,
  name,
}) {
  return (
    <div className="form__inputs">
      <span className="form__promp">{inputTitle}</span>
      <input
        className="form__input popup__input_value_link"
        onChange={onChange}
        id={`form_${idName}`}
        type={inputType}
        name={name}
        required
      />
      <span className="form__input-error link-input-error">{message}</span>
    </div>
  );
};

export default Input;
