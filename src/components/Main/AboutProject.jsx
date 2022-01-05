import React from "react";

const AboutProject = function () {
  return (
    <>
      <section class="about-project root__color-white">
        <div class="about-project-section">
          <h2 class="root__title">О проекте</h2>
          <hr class="root__line" />
          <div class="about-project__block">
            <div class="about-project__description">
              <h3 class="about-project__block-title">
                Дипломный проект включал 5 этапов
              </h3>
              <p class="about-project__block-text">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
            </div>
            <div class="about-project__description">
              <h3 class="about-project__block-title">
                На выполнение диплома ушло 5 недель
              </h3>
              <p class="about-project__block-text">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
            </div>
          </div>
          <div>
            <ul class="about-project__block-time">
              <li
                class="
                  about-project__time
                  root__color-green root__text-color-black
                  about-project__block-height-36
                "
              >
                1 неделя
              </li>

              <li
                class="
                  about-project__time
                  root__color-dark-gray
                  about-project__block-height-36
                "
              >
                4 недели
              </li>

              <li class="about-project__time root__text-color-gray">
                Back-end
              </li>

              <li class="about-project__time root__text-color-gray">
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
