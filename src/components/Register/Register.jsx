import { React, useEffect } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useFormAndValidation } from "../../hooks/useAllFormAndValidation";

const Register = function ({ onRegister, errorsMessage, isDataProcessing }) {
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

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
        errorsMessage={errorsMessage}
        message={isDataProcessing && "Вы успешно зарегистрированы"}
      >
        <Input
          idName="registeringName"
          onChange={handleChange}
          inputTitle="Имя"
          inputType="text"
          name="name"
          value={inputValues.name || ""}
          errors={errors.name || ""}
          maxLength="40"
          minLength="2"
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
