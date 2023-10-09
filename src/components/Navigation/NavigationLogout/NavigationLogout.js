import { NavLink } from "react-router-dom";
import "../Navigation.css";
import "../NavigationLogout/NavigationLogout.css";

function NavigationLogout() {
  return (
    <nav className="menu">
      <NavLink to="/signup" className="menu__link-logout">
        Регистрация
      </NavLink>
      <NavLink to="/signin" className="menu__link-logout">
        <button className="menu__button-enter" type="button">
          Войти
        </button>
      </NavLink>
    </nav>
  );
}

export default NavigationLogout;
