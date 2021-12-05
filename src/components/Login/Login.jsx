import React from "react";

const Login = function () {
  return (
    <div className='form'>
      <form className='form__data'>
        <fieldset className='form__grouping'>
          <legend className='form__title'>Рады видеть!</legend>
          <span className='form__promp'>E-mail</span>
          <input
            className='form__input '
            id='form-email-reg'
            minLength='2'
            maxLength='30'
            placeholder='Email'
            type='email'
            name='email'
            required
          />
          <span className='popup__input-error name-input-error'></span>
          <span className='form__promp'>Пароль</span>
          <input
            className='form__input popup__input_value_link'
            id='form-link-reg'
            placeholder='Пароль'
            type='password'
            name='password'
            required
          />
          <span className='popup__input-error link-input-error'></span>
        </fieldset>
        <button
          type='submit'
          className='form__button'
          aria-label='Зарегистрироваться'>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
