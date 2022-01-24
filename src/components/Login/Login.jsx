import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useAllFormAndValidation";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Login = function ({ onLogin, isDataProcessing }) {
  const { inputValues, errors, isValid, handleChange } = useFormAndValidation();
  const navigate = useNavigate();
  const profile = () => navigate("/profile");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    onLogin({ email: inputValues.email, password: inputValues.password });
  };

  return (
    <>
      <Form
        title="Рады видеть!"
        btnName={isDataProcessing ? "Вход..." : "Войти"}
        onSubmit={handleSubmit}
        onClick={profile}
        name="login"
        text="Ещё не зарегистрированы?"
        linkText="Регистрация"
        pathLink="/register"
        isDisabled={!isValid || isDataProcessing}
      >
        <Input
          idName="loginEmail"
          onChange={handleChange}
          inputTitle="E-mail"
          inputType="email"
          name="email"
          value={inputValues.email || ""}
          errors={errors.email || ""}
        />
        <Input
          idName="loginPassword"
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

export default Login;
