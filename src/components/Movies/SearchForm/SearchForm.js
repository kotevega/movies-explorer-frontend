import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <form className="search">
      <div className="search-form">
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          name="search"
          required
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
