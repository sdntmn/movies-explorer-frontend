import React from "react";

const Techs = function () {
  return (
    <>
      <section class="techs root__color-white root__cover-dark-gray">
        <div class="techs__section">
          <h2 class="root__title">Технологии</h2>
          <hr class="root__line root__color-black" />
          <div class="techs__title-description">
            <h3 class="techs__subtitle">7 технологий</h3>
            <p class="techs__subtitle-text">
              На курсе веб-разработки мы освоили технологии, которые применили в
              дипломном проекте.
            </p>
          </div>
          <ul class="techs__project-techs">
            <li class="techs__project-techs-text root__color-dark-gray">
              HTML
            </li>

            <li class="techs__project-techs-text root__color-dark-gray">CSS</li>

            <li class="techs__project-techs-text root__color-dark-gray">JS</li>

            <li class="techs__project-techs-text root__color-dark-gray">
              React
            </li>

            <li class="techs__project-techs-text root__color-dark-gray">Git</li>

            <li class="techs__project-techs-text root__color-dark-gray">
              Express.js
            </li>

            <li class="techs__project-techs-text root__color-dark-gray">
              mongoDB
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Techs;
