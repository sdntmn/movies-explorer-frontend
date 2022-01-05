import React from "react";

const Footer = function () {
  const today = new Date();
  let year = today.getFullYear();
  const urlYpraktikum = "https://practicum.yandex.ru/profile/web";
  const urlGitHub = "https://github.com/sdntmn/movies-explorer-frontend";
  const urlVk = "https://vk.com/sdntmn";
  return (
    <>
      <footer className="footer root__color-white ">
        <p className="footer__title root__text-color-gray">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>

        <hr className="root__line" />

        <div className="footer__block">
          <p className="footer__copy">© {year}</p>
          <ul className="footer__links">
            <li>
              <a
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
                href={urlYpraktikum}
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
                href={urlGitHub}
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
                href={urlVk}
              >
                Vk
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
