import React from "react";
import "./MoviesCard.css";
import film from "../../../images/film.jpg";
import { useLocation } from "react-router-dom";

function MoviesCard({ name }) {
  const [isSaveFilm, setIsSaveFilm] = React.useState(false);
  const location = useLocation();

  function toggleSaveFilm() {
    setIsSaveFilm(!isSaveFilm);
  }

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">В погоне за Бенкси</h2>
        <p className="card__time">0ч 42м</p>
      </div>
      <img
        className="card__image"
        src={film}
        alt={`Обложка фильма: ${name}`}
      />
      {location.pathname === "/movies" ? (
        <button
          className={!isSaveFilm ? "card__save-button" : "card__ok-button"}
          type="button"
          onClick={toggleSaveFilm}
        >
          {!isSaveFilm ? "Сохранить" : ""}
        </button>
      ) : (
        <button type="button" className="card__delete-button"></button>
      )}
    </li>
  );
}

export default MoviesCard;
