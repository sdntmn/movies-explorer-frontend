import React from "react";

function MoviesCard({ isOpen, time, src, movieTitle, children }) {
  let text;
  let value = time % 100;
  var num = value % 10;

  if (time)
    if (num > 1 && num < 5) {
      text = "минуты";
    }
  if (num === 1) {
    text = "минута";
  }
  if (num === 0) {
    text = "минут";
  }
  if (num > 4 && num < 21) {
    text = "минут";
  }
  if (time > 4 && time < 21) {
    text = "минут";
  }

  return (
    <>
      <li className={`element ${isOpen && "element__color"}`}>
        <div className="element__title">
          <h2 className="element__name">{movieTitle}</h2>

          <span className="element__time">
            {time}&nbsp;{text}
          </span>
        </div>
        <img className="element__img" src={src} alt={movieTitle} />
        {children}
      </li>
    </>
  );
}

export default MoviesCard;
