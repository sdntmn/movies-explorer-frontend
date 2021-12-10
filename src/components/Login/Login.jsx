import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Login = function (name) {
  return (
    <div className="form">
      <Form
        title="Рады видеть!"
        btnName="Войти"
        message=""
        value=""
        onSubmit=""
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
    </div>
  );
};

export default Login;
