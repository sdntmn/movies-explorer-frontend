import React from "react"

const Portfolio = function () {
  const urlStaticSite = "https://sdntmn.github.io/russian-travel/"

  const urlMestoSite = "https://place-tmn.students.nomoredomains.work/"

  const urlAdaptiveSite = "https://ycomanda.github.io/band-project-first/"

  return (
    <>
      {" "}
      <h3 class="about-me__portfolio root__text-color-gray">Портфолио</h3>
      <ul class="about-me__portfolio-links">
        <li class="about-me__portfolio-name">
          Статичный сайт
          <a
            class="about-me__portfolio-link"
            target="_blank"
            rel="noopener noreferrer"
            href={urlStaticSite}
          >
            &#8599;
          </a>
        </li>

        <li class="about-me__portfolio-name">
          Адаптивный сайт
          <a
            class="about-me__portfolio-link"
            target="_blank"
            rel="noopener noreferrer"
            href={urlAdaptiveSite}
          >
            &#8599;
          </a>
        </li>

        <li class="about-me__portfolio-name">
          Одностраничное приложение
          <a
            class="about-me__portfolio-link"
            target="_blank"
            rel="noopener noreferrer"
            href={urlMestoSite}
          >
            &#8599;
          </a>
        </li>
      </ul>
    </>
  )
}

export default Portfolio
