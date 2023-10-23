import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { MovieApi } from "../../utils/MoviesApi";
import api from "../../utils/MainApi";
import {
  DESKTOP_WIDTH,
  DESKTOP_CARDS,
  DESKTOP_CARDS_MORE,
  TABLET_WIDTH,
  TABLET_CARDS,
  TABLET_CARDS_MORE,
  MOBILE_WIDTH,
  MOBILE_CARDS,
  MOBILE_CARDS_MORE,
  SHORT_MOVIE,
} from "../../utils/constants";

function Movies() {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [allMovieCards, setAllMovieCards] = useState(
    JSON.parse(localStorage.getItem("allMovies")) || []
  );
  const [filterMovieCards, setFilterMovieCards] = useState(
    JSON.parse(localStorage.getItem("filterMovies")) || []
  );
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShort")) || false
  );

  const [isPreloader, setIsPreloader] = useState(false);
  const [searchError, setSeachError] = useState(false);
  const [isSavedMovieCard, setIsSavedMovieCard] = useState([]);

  const [cardOfView, setCardOfView] = useState(0);
  const [addCardButtonMore, setAddCardButtonMore] = useState(0);
  const [handleButtonMore, setHanldeButtonMore] = useState(false);

  function handleSetCardOfView() {
    const resize = window.innerWidth;

    if (resize > DESKTOP_WIDTH) {
      setCardOfView(DESKTOP_CARDS);
      setAddCardButtonMore(DESKTOP_CARDS_MORE);
    }

    if (resize >= TABLET_WIDTH && resize <= DESKTOP_WIDTH) {
      setCardOfView(TABLET_CARDS);
      setAddCardButtonMore(TABLET_CARDS_MORE);
    }

    if (resize >= MOBILE_WIDTH && resize < TABLET_WIDTH) {
      setCardOfView(MOBILE_CARDS);
      setAddCardButtonMore(MOBILE_CARDS_MORE);
    }
    handleHadeButtonMore();
  }

  function handleMoreButtonClick() {
    setCardOfView(cardOfView + addCardButtonMore);
    handleHadeButtonMore();
  }

  function handleHadeButtonMore() {
    if (cardOfView >= filterMovieCards.length) {
      setHanldeButtonMore(true);
    } else {
      setHanldeButtonMore(false);
    }
  }

  function filterName(data) {
    if (searchQuery) {
      return data.filter((movie) => {
        const nameEn = movie.nameEN
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const nameRu = movie.nameRU
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        if (!isShort) {
          return nameEn || nameRu;
        } else {
          return (
            (nameEn && movie.duration <= SHORT_MOVIE) ||
            (nameRu && movie.duration <= SHORT_MOVIE)
          );
        }
      });
    } else {
      return [];
    }
  }

  useEffect(() => {
    api
      .getSavedMovies()
      .then((res) => {
        setIsSavedMovieCard(res);
        localStorage.setItem("savedMovies", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

    window.addEventListener("resize", () => {
      handleSetCardOfView();
    });
    handleSetCardOfView();

    return () => {
      window.removeEventListener("resize", () => {
        handleSetCardOfView();
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchMovies() {
    if (allMovieCards.length === 0) {
      setIsPreloader(true);
      MovieApi.getMoviesCardsApi(searchQuery)
        .then((cards) => {
          localStorage.setItem("allMovies", JSON.stringify(cards));
          setAllMovieCards(cards);
          setFilterMovieCards(filterName(cards));
          localStorage.setItem(
            "filterMovies",
            JSON.stringify(filterName(cards))
          );
          setIsPreloader(false);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setSeachError(true);
        });
    } else {
      if (searchQuery.length === 0) {
        return setFilterMovieCards([]);
      } else {
        setFilterMovieCards(filterName(allMovieCards));
        localStorage.setItem(
          "filterMovies",
          JSON.stringify(filterName(allMovieCards))
        );
      }
    }
  }

  function handleSetIsShort() {
    setIsShort(!isShort);
    localStorage.setItem("isShort", JSON.stringify(!isShort));
  }

  React.useEffect(() => {
    setFilterMovieCards(filterName(allMovieCards));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShort]);

  React.useEffect(() => {
    handleHadeButtonMore();
    handleSetCardOfView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMovieCards]);

  return (
    <main className="movies">
      <SearchForm
        searchQuery={searchQuery}
        searchMovies={searchMovies}
        setSearchQuery={setSearchQuery}
        isShort={isShort}
        setIsShort={handleSetIsShort}
      />
      <MoviesCardList
        allMovieCards={allMovieCards}
        isSavedMovieCard={isSavedMovieCard}
        setIsSavedMovieCard={setIsSavedMovieCard}
        cards={filterMovieCards.slice(0, cardOfView)}
        searchQuery={searchQuery}
        isPreloader={isPreloader}
        searchError={searchError}
        filterMovieCards={filterMovieCards}
      />
      <button
        className={
          !handleButtonMore
            ? "movies__more-button"
            : "movies__more-button_disabled"
        }
        type="button"
        onClick={handleMoreButtonClick}
      >
        Ещё
      </button>
    </main>
  );
}
export default Movies;
