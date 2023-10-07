import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label class="filter">
      <input class="filter__checkbox" type="checkbox"></input>
      <div class="filter__switch"></div>
      <p class="filter__text">Короткометражки</p>
    </label>
  );
}

export default FilterCheckbox;
