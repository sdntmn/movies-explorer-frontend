import React from "react";
import Header from "../Header/Header";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Login = function (name) {
  return (
    <>
      <Header stylesHider='header__auth'></Header>

      <Form
        title='Рады видеть!'
        btnName='Войти'
        message=''
        value=''
        onSubmit=''
        onChange=''
        name=''
        text='Ещё не зарегистрированы?'
        linkText='Регистрация'
        pathLink='/register'
        sylesSection='form__section-log'>
        <Input inputTitle='E-mail' idName={`${name}`} inputType='email'></Input>
        <Input
          inputTitle='Пароль'
          idName={`${name}`}
          inputType='password'></Input>
      </Form>
    </>
  );
};

export default Login;
