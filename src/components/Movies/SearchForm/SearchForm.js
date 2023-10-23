import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  searchMovies,
  searchQuery,
  setSearchQuery,
  isShort,
  setIsShort,
}) {
  const [searchInputError, setSearchInputError] = useState(false);
  const location = useLocation();

  function handleSearch(e) {
    if (location.pathname === "/movies") {
      localStorage.setItem("searchQuery", e.target.value);
    }
    setSearchQuery(e.target.value);
    setSearchInputError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchQuery) {
      setSearchInputError(true);
      return;
    }
    searchMovies();
  }

  return (
    <form className="search" noValidate onSubmit={handleSubmit}>
      <span className="search__err">
        {searchInputError ? "Нужно ввести ключевое слово" : ""}
      </span>
      <div className="search-form">
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          name="search"
          required
          noValidate
          value={searchQuery}
          onChange={handleSearch}
        ></input>
        <button type="submit" className="search-form__submit">
          Поиск
        </button>
      </div>
      <FilterCheckbox isShort={isShort} setIsShort={setIsShort} />
    </form>
  );
}

export default SearchForm;
