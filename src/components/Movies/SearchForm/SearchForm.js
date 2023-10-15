import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ searchMovies, searchQuery, setSearchQuery }) {
  const [searchInputError, setSearchInputError] = useState(false);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
    setSearchInputError(false);
    localStorage.setItem("searchQuery", e.target.value);
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
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
