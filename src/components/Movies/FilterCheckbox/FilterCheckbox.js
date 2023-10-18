import "./FilterCheckbox.css";

function FilterCheckbox({isShort, setIsShort}) {
  return (
    <div class="filter">
      <input type="checkbox" name="toggle" class="filter__checkbox" checked={isShort} onChange={setIsShort}/>
      <label class="filter__text">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
