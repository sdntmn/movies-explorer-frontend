import React from "react";
import { Link } from "react-router-dom";

const Profile = function () {
  return (
    <>
      <div className="profile root__section">
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
          <Link to="edit" className="profile__link">
            Редактировать
          </Link>
          <Link to="/login" className="profile__link-out">
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
