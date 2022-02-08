import { React } from "react";
import { Link } from "react-router-dom";
import iconPath from "../../images/icon__COLOR_icon-main.svg";

const LinkProfile = function ({ pathLink, onClose }) {
  return (
    <Link to={pathLink} className="header__profile-icons" onClick={onClose}>
      <span className="header__profile-account">Аккаунт</span>
      <img
        className="header__profile-icon"
        src={iconPath}
        alt="Логотип сайта"
      />
    </Link>
  );
};

export default LinkProfile;
