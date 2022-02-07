import React from "react";

const Portfolio = function () {
  const urlStaticSite = "https://sdntmn.github.io/russian-travel/";

  const urlMestoSite = "https://place-tmn.students.nomoredomains.work/";

  const urlAdaptiveSite = "https://ycomanda.github.io/band-project-first/";

  return (
    <>
      {" "}
      <h3 className="portfolio root__text-color-gray">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__name">
          Статичный сайт
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href={urlStaticSite}
          >
            &#8599;
          </a>
        </li>

        <li className="portfolio__name">
          Адаптивный сайт
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href={urlAdaptiveSite}
          >
            &#8599;
          </a>
        </li>

        <li className="portfolio__name">
          Одностраничное приложение
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href={urlMestoSite}
          >
            &#8599;
          </a>
        </li>
      </ul>
    </>
  );
};

export default Portfolio;
