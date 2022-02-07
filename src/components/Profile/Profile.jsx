import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useAllFormAndValidation";

import Form from "../Form/Form";

const Profile = function ({
  isEditState,
  isActive = false,
  onUpdateUser,
  onEndSession,
  onClose,
  isDataProcessing,
  errorsMessage,
  message,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isAddValidity, setIsAddValidity] = useState(false);
  const { inputValues, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    setUserName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const validationChangeableData = useCallback(
    (currentUser) => {
      if (
        typeof inputValues.name !== "undefined" &&
        typeof inputValues.email !== "undefined" &&
        currentUser.email !== inputValues.email &&
        currentUser.name !== inputValues.name
      ) {
        setIsAddValidity(true);
      } else {
        setIsAddValidity(false);
      }
    },
    [inputValues]
  );

  useEffect(() => {
    validationChangeableData(currentUser);
  }, [
    currentUser,
    currentUser.email,
    currentUser.name,
    inputValues.email,
    inputValues.name,
    validationChangeableData,
    setIsAddValidity,
  ]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    onUpdateUser({ email: inputValues.email, name: inputValues.name });
    resetForm();
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
            <Link onClick={onEndSession} to="/" className="profile__link-out">
              Выйти из аккаунта
            </Link>
          </div>
        </div>
      ) : (
        <Form
          isEditState={isEditState}
          title={`Привет, ${userName}!`}
          btnName={isDataProcessing ? "Сохранение..." : "Сохранить"}
          message={message}
          onSubmit={handleSubmit}
          onClose={onClose}
          name="changeData"
          text="Ещё не зарегистрированы?"
          linkText="Регистрация"
          pathLink="/register"
          isDisabled={!isValid || isDataProcessing}
          errorsMessage={errorsMessage}
          isAddValidity={isAddValidity}
        >
          <div className="profile__grouping">
            <span className="profile__input-text">Имя</span>

            <input
              className="profile__input"
              id="changeName"
              type="text"
              name="name"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={inputValues.name || userName}
              errors={errors.userName || ""}
              placeholder={userName}
              required
            />
          </div>
          <hr className="profile__line" />
          <div className="profile__grouping">
            <span className="profile__input-text">Почта</span>
            <input
              className="profile__input"
              id="changeEmail"
              type="email"
              name="email"
              onChange={handleChange}
              value={inputValues.email || email}
              errors={errors.email || ""}
              placeholder={email}
              required
            />
          </div>
        </Form>
      )}
    </>
  );
};

export default Profile;
