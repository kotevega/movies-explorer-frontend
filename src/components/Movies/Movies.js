import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { MovieApi } from "../../utils/MoviesApi";

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

  const [isPreloader, setIsPreloader] = useState(false);
  const [searchError, setSeachError] = useState(false);

  function filter(data) {
    console.log(data);
    if (searchQuery) {
      return data.filter(
        (movie) =>
          movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return [];
    }
  }

  function searchMovies() {
    if (allMovieCards.length === 0) {
      setIsPreloader(true);
      MovieApi.getMoviesCardsApi(searchQuery)
        .then((cards) => {
          localStorage.setItem("allMovies", JSON.stringify(cards));
          setAllMovieCards(cards);
          setFilterMovieCards(filter(cards));
          localStorage.setItem("filterMovies", JSON.stringify(filter(cards)));
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
        setFilterMovieCards(filter(allMovieCards));
        localStorage.setItem("filterMovies", JSON.stringify(filter(allMovieCards)));
      }
    }
  }

  return (
    <main className="movies">
      <SearchForm
        searchQuery={searchQuery}
        searchMovies={searchMovies}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList
        allMovieCards={allMovieCards}
        // cards={filter(allMovieCards)}
        cards={filterMovieCards}
        searchQuery={searchQuery}
        isPreloader={isPreloader}
        searchError={searchError}
      />
      <button className="movies__more-button" type="button">
        Ещё
      </button>
    </main>
  );
}
export default Movies;
