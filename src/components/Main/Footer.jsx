import React from "react";
import { Link } from "react-router-dom";

const Footer = function () {
  const today = new Date();
  let year = today.getFullYear();
  return (
    <>
      <footer class='footer root__color-white'>
        <p class='footer__title root__text-color-gray'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <hr class='root__line' />
        <div class='footer__block'>
          <p class='footer__copy'>© {year}</p>
          <ul class='footer__links'>
            <li>
              <Link class='footer__link' to='https://practicum.yandex.ru/web/'>
                Яндекс.Практикум
              </Link>
            </li>
            <li>
              <Link
                class='footer__link'
                to='https://github.com/sdntmn/movies-explorer-frontend'>
                Github
              </Link>
            </li>
            <li>
              <Link class='footer__link' to='https://vk.com/feed'>
                Vk
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
