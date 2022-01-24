import React from "react";

const Input = function ({
  idName,
  onChange,
  inputTitle,
  inputType,
  name,
  minLength,
  maxLength,
  value,
  errors,
  pattern,
}) {
  return (
    <div className="form__inputs">
      <span className="form__promp">{inputTitle}</span>
      <input
        className="form__input popup__input_value_link"
        id={`form_${idName}`}
        onChange={onChange}
        type={inputType}
        name={name}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required
      />
      <span className="form__input-error link-input-error">{errors}</span>
    </div>
  );
};

export default Input;
