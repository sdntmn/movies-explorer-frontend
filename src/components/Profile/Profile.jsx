import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Form from "../Form/Form";

const Profile = function ({
  isEditState,
  isActive = false,
  isNotActive,
  onUpdateUser,
  onEndSession,
  onClose,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUserName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  // Обработчик изменения инпута обновляет стейт
  function handleInputName(evt) {
    setUserName(evt.target.value);
  }

  // Обработчик изменения инпута обновляет стейт
  function handleInputEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: userName,
      email,
    });
  }

  return (
    <>
      {!isEditState ? (
        <div className="profile root__section">
          <h2 className="profile__title">Привет, {userName}!</h2>
          <div className="profile__section">
            <div className="profile__block">
              <p className="profile__name">Имя</p>
              <p className="profile__data">{userName}</p>
            </div>
            <div className="profile__hr"></div>
            <div className="profile__block">
              <p className="profile__name">E-mail</p>
              <p className="profile__data">{email}</p>
            </div>
          </div>
          <div className="profile__links">
            <Link onClick={isActive} to="/profile" className="profile__link">
              Редактировать
            </Link>
            <Link
              onClick={onEndSession}
              to="/login"
              className="profile__link-out"
            >
              Выйти из аккаунта
            </Link>
          </div>
        </div>
      ) : (
        <Form
          isEditState={isEditState}
          title={`Привет, ${userName}!`}
          btnName="Сохранить"
          message=""
          onSubmit={handleSubmit}
          onClose={onClose}
          name="changeData"
          text="Ещё не зарегистрированы?"
          linkText="Регистрация"
          pathLink="/register"
        >
          <div className="profile__gruping">
            <span className="profile__input-text">Имя</span>
            <input
              className="profile__input"
              id="changeData"
              type="text"
              minLength="2"
              maxLength="40"
              placeholder={userName}
              onChange={handleInputName}
              required
            />
          </div>
          <hr className="profile__line" />
          <div className="profile__gruping">
            <span className="profile__input-text">Почта</span>
            <input
              className="profile__input"
              id="changeData"
              type="email"
              placeholder={email}
              onChange={handleInputEmail}
              required
            />
          </div>
        </Form>
      )}
    </>
  );
};

export default Profile;
