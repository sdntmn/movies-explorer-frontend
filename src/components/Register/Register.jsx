import { React, useState } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Register = function ({ name, onRegister }) {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Обработчик изменения инпута обновляет стейт
  const handleChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    onRegister({
      name: inputValue.name,
      email: inputValue.email,
      password: inputValue.password,
    });
  };
  return (
    <>
      <Form
        title="Добро пожаловать!"
        btnName="Зарегистрироваться"
        onSubmit={handleSubmit}
        name="registering"
        text="Уже зарегистрированы?"
        linkText="Войти"
        pathLink="/login"
      >
        <Input
          onChange={handleChange}
          inputTitle="Имя"
          value={inputValue.name}
          idName="registering"
          inputType="text"
          name="name"
        />
        <Input
          onChange={handleChange}
          inputTitle="E-mail"
          value={inputValue.email}
          idName="registering"
          inputType="email"
          name="email"
        />
        <Input
          onChange={handleChange}
          inputTitle="Пароль"
          value={inputValue.password}
          idName="registering"
          inputType="password"
          name="password"
        />
      </Form>
    </>
  );
};

export default Register;
