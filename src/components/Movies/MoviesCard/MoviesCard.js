import React, { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation, Link } from "react-router-dom";
import api from "../../../utils/MainApi";
import { MIN } from "../../../utils/constants";

function MoviesCard({
  card,
  isSavedMovieCard,
  setIsSavedMovieCard,
  setFilterMovieCards,
  filterMovieCards
}) {
  const [isSaveFilm, setIsSaveFilm] = useState(false);
  const location = useLocation();
  const [disButton, setDisButton] = useState(false);
  useEffect(() => {
    const likeMovie = JSON.parse(localStorage.getItem("savedMovies")).find(
      (film) => film.movieId === card.id
    );
    if (likeMovie) {
      setIsSaveFilm(true);
    } else {
      setIsSaveFilm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMovieLike(movie) {
    api
      .saveMovie({
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        trailerLink: movie.trailerLink,
        year: movie.year,
        movieId: movie.id,
      })
      .then((res) => {
        setIsSaveFilm(true);
        const array = isSavedMovieCard;
        array.push(res);
        setIsSavedMovieCard(array);
        localStorage.setItem("savedMovies", JSON.stringify(array));
        setDisButton(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsSaveFilm(false);
        setDisButton(false);
      });
  }

  function handleMovieDelete(movie) {
    const findMovie = isSavedMovieCard.find(
      (film) => film.movieId === movie.id
    );
    api
      .deleteMovieFromApi(movie._id ? movie._id : findMovie._id)
      .then((res) => {
        setIsSaveFilm(false);
        const arr = isSavedMovieCard.filter((film) => {
          if (movie._id) {
            return film._id !== movie._id;
          } else {
            return film.movieId !== movie.id;
          }
        });
        setIsSavedMovieCard(arr);
        if (location.pathname === "/saved-movies") {
          const arr = filterMovieCards.filter(film => film._id !== movie._id)
          setFilterMovieCards(arr);
        }
        localStorage.setItem("savedMovies", JSON.stringify(arr));
        setDisButton(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setDisButton(false);

        setIsSaveFilm(true);
      });
  }

  function toggleSaveFilm(movie) {
    setIsSaveFilm(!isSaveFilm);
    setDisButton(true);
    if (isSaveFilm) {
      handleMovieDelete(movie);
    } else {
      handleMovieLike(movie);
    }
  }

  function converterHoursMins(mins) {
    const hours = Math.trunc(mins / MIN);
    const minutes = mins % MIN;
    if (mins >= MIN) {
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
            card.image?.url
              ? `https://api.nomoreparties.co/${card.image.url}`
              : card.image
          }
          alt={`Обложка фильма: ${card.RU || card.nameEN}`}
        />
      </Link>
      {location.pathname === "/movies" ? (
        <button
          disabled={disButton}
          className={!isSaveFilm ? "card__save-button" : "card__ok-button"}
          type="button"
          onClick={() => toggleSaveFilm(card)}
        >
          {!isSaveFilm ? "Сохранить" : ""}
        </button>
      ) : (
        <button
          type="button"
          className="card__delete-button"
          onClick={() => handleMovieDelete(card)}
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
