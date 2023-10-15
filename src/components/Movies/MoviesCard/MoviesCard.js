import React from "react";
import "./MoviesCard.css";
// import film from "../../../images/film.jpg";
import { useLocation, Link } from "react-router-dom";

function MoviesCard({ card }) {
  const [isSaveFilm, setIsSaveFilm] = React.useState(false);
  const location = useLocation();

  function toggleSaveFilm() {
    setIsSaveFilm(!isSaveFilm);
  }

  function converterHoursMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    if (mins >= 60) {
      return hours + "ч " + minutes + "м";
    } else {
      return minutes + "м";
    }
  }

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">{card.name || card.nameRU}</h2>
        <p className="card__time">{converterHoursMins(card.duration)}</p>
      </div>
      <Link to={card.trailerLink} target="_blank">
        <img
          className="card__image"
          src={
            card.image
              ? `https://api.nomoreparties.co/${card.image.url}`
              : card.image
          }
          alt={`Обложка фильма: ${card.name}`}
        />
      </Link>
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
