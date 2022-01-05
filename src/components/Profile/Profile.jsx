import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";



const Profile = function ({ isEditState, isActive, isNotActive, name }) {
  return (
    <>
      { !isEditState ? (<div className="profile root__section">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__section">
          <div className="profile__block">
            <p className="profile__name">Имя</p>
            <p className="profile__data">Виталий</p>
          </div>
          <div className="profile__hr"></div>
          <div className="profile__block">
            <p className="profile__name">E-mail</p>
            <p className="profile__data">pochta@yandex.ru</p>
          </div>
        </div>
        <div className="profile__links">
          <Link onClick={isActive} to="/profile" className="profile__link">
            Редактировать
          </Link>
          <Link to="/login" className="profile__link-out">
            Выйти из аккаунта
          </Link>
        </div>
      </div>) : (
          <Form
            isEditState={isEditState}
            title="Привет, Виталий!"
            btnName="Сохранить"
            message=""
            value=""
            onChange=""
            name=""
            text="Ещё не зарегистрированы?"
            linkText="Регистрация"
            pathLink="/register"
          >
            <div className="profile__gruping">
              <span className="profile__input-text">Имя</span>
                <input
                  className="profile__input"
                  id="form_email"
                  type="text"
                  placeholder="Дима"
                  required
              />
              </div>
            <hr className="profile__line" />
            <div className="profile__gruping">
            <span className="profile__input-text">Почта</span>
            <input
              className="profile__input"
              id="form_email"
                type="email"
                placeholder="pochta@yandex.ru"
              required
              />
              </div>
          </Form>
      )}
    </>
  );
};

export default Profile;
