import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Register = function (name) {
  return (
    <>
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
        <Input inputTitle="Имя" idName={`${name}`} inputType="Text" />
        <Input inputTitle="E-mail" idName={`${name}`} inputType="email" />
        <Input inputTitle="Пароль" idName={`${name}`} inputType="password" />
      </Form>
    </>
  );
};

export default Register;
