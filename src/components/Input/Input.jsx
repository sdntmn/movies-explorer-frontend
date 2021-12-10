import React from "react";

const Register = function ({ inputTitle, inputType, message, idName }) {
  return (
    <>
      <span className='form__promp'>{inputTitle}</span>
      <input
        className='form__input popup__input_value_link'
        id={`form_${idName}`}
        type={inputType}
        required
      />
      <span className='popup__input-error link-input-error'>{message}</span>
    </>
  );
};

export default Register;
