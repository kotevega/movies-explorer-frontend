import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <div className="search">
      <form className="search-form">
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          name="search"
        ></input>
        <button type="submit" className="search-form__submit">
          Поиск
        </button>
      </form>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
