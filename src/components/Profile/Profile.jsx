import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useAllFormAndValidation";

import Form from "../Form/Form";

const Profile = function ({
  isEditState,
  isActive = false,
  isNotActive,
  onUpdateUser,
  onEndSession,
  onClose,
  isDataProcessing,
}) {
  const { inputValues, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUserName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    resetForm();
  }, [currentUser, resetForm]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    onUpdateUser({ email: email, name: userName });
  };

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
          btnName={isDataProcessing ? "Сохранение..." : "Сохранить"}
          message=""
          onSubmit={handleSubmit}
          onClose={onClose}
          name="changeData"
          text="Ещё не зарегистрированы?"
          linkText="Регистрация"
          pathLink="/register"
          isDisabled={!isValid || isDataProcessing}
        >
          <div className="profile__gruping">
            <span className="profile__input-text">Имя</span>
            <input
              className="profile__input"
              id="changeName"
              type="text"
              name="name"
              minLength="2"
              maxLength="40"
              placeholder={userName}
              onChange={handleChange}
              value={inputValues.name || ""}
              errors={errors.userName || ""}
              required
            />
          </div>
          <hr className="profile__line" />
          <div className="profile__gruping">
            <span className="profile__input-text">Почта</span>
            <input
              className="profile__input"
              id="changeEmail"
              type="email"
              name="email"
              placeholder={email}
              onChange={handleChange}
              value={inputValues.email || ""}
              errors={errors.email || ""}
              required
            />
          </div>
        </Form>
      )}
    </>
  );
};

export default Profile;
