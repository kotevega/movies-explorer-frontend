import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div class="filter">
      <input type="checkbox" name="toggle" class="filter__checkbox" />
      <label class="filter__text">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
