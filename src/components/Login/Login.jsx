import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useAllFormAndValidation";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Login = function ({ onLogin, isDataProcessing, errorsMessage }) {
  const { inputValues, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();
  const navigate = useNavigate();
  const profile = () => navigate("/profile");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    onLogin({ email: inputValues.email, password: inputValues.password });
    resetForm();
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
        errorsMessage={errorsMessage}
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
