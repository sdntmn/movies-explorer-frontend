import React from "react";
import { Link } from "react-router-dom";
import promoPath from "../../images/promo.svg";

const Promo = function () {
  return (
    <div className='root__cover'>
      <section className='promo'>
        <div className='promo__section'>
          <div className='promo__block'>
            <h1 className='promo__title'>
              Учебный проект студента факультета Веб
              <span className='promo__space'>-разработки</span>.
            </h1>
            <p className='promo__text'>
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
          </div>
          <img className='promo__img' src={promoPath} alt='Логотип сайта' />
        </div>
        <Link className='promo__button' to='/'>
          Узнать больше
        </Link>
      </section>
    </div>
  );
};

export default Promo;
