import React from "react";

function InfoTooltip({ isOpenInfo, errors }) {
  return (
    <div className={`info ${isOpenInfo && "info_is-opened"}`}>
      <div className="info__container">
        <p className="info__img-sign-name">{errors}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
