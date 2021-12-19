import React from "react"
import { Link } from "react-router-dom"
import FotoPatch from "../../images/1970-01-01 05-00-00_1603392151327.JPG"

const AboutMe = function () {
  const urlGitHub = "https://github.com/sdntmn/movies-explorer-frontend"
  const urlVk = "https://vk.com/sdntmn"
  return (
    <>
      <section class="about-me root__color-white">
        <h2 class="root__title">Студент</h2>
        <hr class="root__line" />
        <div class="about-me__block">
          <div class="about-me__block-project">
            <div class="about-me__block-description">
              <div class="about-me__block-description-text">
                <span class="about-me__name">Денис</span>
                <h3 class="about-me__subtitle">
                  Фронтенд-разработчик, 44 года
                </h3>
                <p class="about-me__description">
                  Я родился и живу в Тюмени, закончил торгово-экономический
                  техникум. Женат, детей трое, две дочери и сын. Люблю слушать
                  музыку и мастерить деревянные изделия для домашнего хозяйства.
                  В 2020 году вернулся к интересующей меня области развития -
                  программированию. И это мой дипломный проект курса Веб
                  <span className="promo__space">-разработки</span> на
                  ЯПрактикум.
                </p>
              </div>
              <ul className="about-me__block-description-link">
                <li>
                  <a
                    className="about-me__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={urlVk}
                  >
                    VK
                  </a>
                </li>
                <li>
                  <a
                    className="about-me__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={urlGitHub}
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <img class="about-me__img" src={FotoPatch} alt="Фото" />
          </div>

          <h3 class="about-me__portfolio root__text-color-gray">Портфолио</h3>
          <ul class="about-me__portfolio-links">
            <li class="about-me__portfolio-name">
              Статичный сайт
              <Link class="about-me__portfolio-link" to="">
                &#8599;
              </Link>
            </li>

            <li class="about-me__portfolio-name">
              Адаптивный сайт
              <Link class="about-me__portfolio-link" to="">
                &#8599;
              </Link>
            </li>

            <li class="about-me__portfolio-name">
              Одностраничное приложение
              <Link class="about-me__portfolio-link" to="">
                &#8599;
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default AboutMe
