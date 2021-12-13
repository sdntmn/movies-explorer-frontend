import React from "react"
import Form from "../Form/Form"
import Input from "../Input/Input"
import Header from "../Header/Header"

const Register = function (name) {
  return (
    <>
      <Header stylesHider="header__auth">
        <p className="header__title-auth">Добро пожаловать!</p>
      </Header>
      <Form
        title="Добро пожаловать!"
        btnName="Зарегистрироваться"
        message=""
        value=""
        onSubmit=""
        onChange=""
        name=""
        text="Уже зарегистрированы?"
        linkText="Войти"
        pathLink="/login"
      >
        <Input inputTitle="Имя" idName={`${name}`} inputType="Text"></Input>
        <Input inputTitle="E-mail" idName={`${name}`} inputType="email"></Input>
        <Input
          inputTitle="Пароль"
          idName={`${name}`}
          inputType="password"
        ></Input>
      </Form>
    </>
  )
}

export default Register
