import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Login = function ({ onLogin, name }) {
  const navigate = useNavigate();
  const profile = () => navigate("/profile");

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  // Обработчик изменения инпута обновляет стейт
  const handleChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    onLogin({ email: inputValue.email, password: inputValue.password });
  };

  return (
    <>
      <Form
        title="Рады видеть!"
        btnName="Войти"
        onSubmit={handleSubmit}
        onClick={profile}
        name="login"
        text="Ещё не зарегистрированы?"
        linkText="Регистрация"
        pathLink="/register"
      >
        <Input
          onChange={handleChange}
          inputTitle="E-mail"
          value={inputValue.email}
          idName="login"
          inputType="email"
          name="email"
        />
        <Input
          onChange={handleChange}
          inputTitle="Пароль"
          value={inputValue.password}
          idName="login"
          inputType="password"
          name="password"
        />
      </Form>
    </>
  );
};

export default Login;
