import React, { useEffect, useState } from "react";
import api from "../../utils/MainApi";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies() {
  const [isSavedMovieCard, setIsSavedMovieCard] = useState([]);
  const [searchError, setSeachError] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShort, setIsShort] = useState(false);
  const [filterMovieCards, setFilterMovieCards] = useState([]);

  useEffect(() => {
    api
      .getSavedMovies()
      .then((res) => {
        setIsSavedMovieCard(res);
        setFilterMovieCards(res);
        localStorage.setItem("savedMovies", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function filterName(data) {
    if (searchQuery || isShort || !isShort) {
      setIsPreloader(false);
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
            (nameEn && movie.duration <= 40) || (nameRu && movie.duration <= 40)
          );
        }
      });
    } else {
      setSeachError(false);
      return [];
    }
  }

  function searchMovies() {
    setFilterMovieCards(filterName(isSavedMovieCard));
  }

  function handleSetIsShort() {
    setIsShort(!isShort);
  }

  React.useEffect(() => {
    setFilterMovieCards(filterName(isSavedMovieCard));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShort]);

  return (
    <main className="saved-movies">
      <SearchForm
        searchQuery={searchQuery}
        searchMovies={searchMovies}
        setSearchQuery={setSearchQuery}
        isShort={isShort}
        setIsShort={handleSetIsShort}
      />
      <MoviesCardList
        isSavedMovieCard={isSavedMovieCard}
        setIsSavedMovieCard={setIsSavedMovieCard}
        allMovieCards={isSavedMovieCard}
        cards={filterMovieCards}
        searchQuery={searchQuery}
        isPreloader={isPreloader}
        searchError={searchError}
        setFilterMovieCards={setFilterMovieCards}
      />
    </main>
  );
}

export default SavedMovies;
