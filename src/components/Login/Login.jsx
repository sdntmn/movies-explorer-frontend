import { useNavigate } from "react-router-dom"
import React from "react"
import Header from "../Header/Header"
import Form from "../Form/Form"
import Input from "../Input/Input"

const Login = function (name) {
  const navigate = useNavigate()
  const profile = () => navigate("/profile")

  return (
    <>
      <div className="header__auth">
        <p className="header__title-auth">Рады видеть!</p>
      </div>
      <Form
        title="Рады видеть!"
        btnName="Войти"
        message=""
        value=""
        onClick={profile}
        onChange=""
        name=""
        text="Ещё не зарегистрированы?"
        linkText="Регистрация"
        pathLink="/register"
      >
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

export default Login
