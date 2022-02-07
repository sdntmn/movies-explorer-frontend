import React from "react";

const Techs = function () {
  return (
    <>
      <section className="techs root__color-white root__cover-dark-gray">
        <div className="techs__section">
          <h2 className="root__title">Технологии</h2>
          <hr className="root__line root__color-black" />
          <div className="techs__title-description">
            <h3 className="techs__subtitle">7 технологий</h3>
            <p className="techs__subtitle-text">
              На курсе веб-разработки мы освоили технологии, которые применили в
              дипломном проекте.
            </p>
          </div>
          <ul className="techs__project-techs">
            <li className="techs__project-techs-text root__color-dark-gray">
              HTML
            </li>

            <li className="techs__project-techs-text root__color-dark-gray">
              CSS
            </li>

            <li className="techs__project-techs-text root__color-dark-gray">
              JS
            </li>

            <li className="techs__project-techs-text root__color-dark-gray">
              React
            </li>

            <li className="techs__project-techs-text root__color-dark-gray">
              Git
            </li>

            <li className="techs__project-techs-text root__color-dark-gray">
              Express.js
            </li>

            <li className="techs__project-techs-text root__color-dark-gray">
              mongoDB
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Techs;
