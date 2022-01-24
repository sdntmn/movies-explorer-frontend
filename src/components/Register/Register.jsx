import { React, useState } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useFormAndValidation } from "../../hooks/useAllFormAndValidation";

const Register = function ({
  onRegister,
  isDataProcessing,
  isDisabled = false,
}) {
  const { inputValues, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    onRegister({
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
    });
  };
  return (
    <>
      <Form
        title="Добро пожаловать!"
        btnName={isDataProcessing ? "Регистрация..." : "Зарегистрироваться"}
        onSubmit={handleSubmit}
        name="registering"
        text="Уже зарегистрированы?"
        linkText="Войти"
        pathLink="/login"
        isDisabled={!isValid || isDataProcessing}
      >
        <Input
          idName="registeringName"
          onChange={handleChange}
          inputTitle="Имя"
          inputType="text"
          name="name"
          value={inputValues.name || ""}
          errors={errors.name || ""}
          minLength="2"
          maxLength="40"
          pattern="[a-zA-Zа-яА-я -]{1,}"
        />
        <Input
          idName="registeringEmail"
          onChange={handleChange}
          inputTitle="E-mail"
          inputType="email"
          name="email"
          value={inputValues.email || ""}
          errors={errors.email || ""}
        />
        <Input
          idName="registeringPassword"
          onChange={handleChange}
          inputTitle="Пароль"
          inputType="password"
          name="password"
          minLength="8"
          maxLength="40"
          value={inputValues.password || ""}
          errors={errors.password || ""}
        />
      </Form>
    </>
  );
};

export default Register;
