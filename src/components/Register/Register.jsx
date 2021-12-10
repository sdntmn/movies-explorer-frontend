import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Register = function (name) {
  return (
    <div className="form">
      <Form
        path="/register"
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
    </div>
  );
};

export default Register;
