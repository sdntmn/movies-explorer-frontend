import { useNavigate } from "react-router-dom";
import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Login = function (name) {
  const navigate = useNavigate();
  const profile = () => navigate("/profile");

  return (
    <>
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
        <Input inputTitle="E-mail" idName={`${name}`} inputType="email" />
        <Input inputTitle="Пароль" idName={`${name}`} inputType="password" />
      </Form>
    </>
  );
};

export default Login;
