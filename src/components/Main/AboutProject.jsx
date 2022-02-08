import React from "react";

const AboutProject = function () {
  return (
    <>
      <section className="about-project root__color-white">
        <div className="about-project-section">
          <h2 className="root__title">О проекте</h2>
          <hr className="root__line" />
          <div className="about-project__block">
            <div className="about-project__description">
              <h3 className="about-project__block-title">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="about-project__block-text">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
            </div>
            <div className="about-project__description">
              <h3 className="about-project__block-title">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="about-project__block-text">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
            </div>
          </div>
          <div>
            <ul className="about-project__block-time">
              <li
                className="
                  about-project__time
                  root__color-green root__text-color-black
                  about-project__block-height-36
                "
              >
                1 неделя
              </li>

              <li
                className="
                  about-project__time
                  root__color-dark-gray
                  about-project__block-height-36
                "
              >
                4 недели
              </li>

              <li className="about-project__time root__text-color-gray">
                Back-end
              </li>

              <li className="about-project__time root__text-color-gray">
                Front-end
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutProject;
