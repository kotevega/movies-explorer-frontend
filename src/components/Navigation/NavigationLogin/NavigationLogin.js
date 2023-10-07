import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoProfile from "../../../images/profile_logo.svg";
import "../Navigation.css";
import "../NavigationLogin/NavigationLogin.css";

function NavigationLogin() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const menuLinkActive = ({ isActive }) =>
    `menu__link-movies ${isActive ? "menu__link_active" : ""}`;

  function toggleMenuBurger() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenuOpen() {
    setIsMenuOpen(false);
  }

  return (
    <nav className={`menu ${isMenuOpen ? "menu_open" : ""}`}>
      <div className="menu__burger-cover"></div>
      <div className="menu__container">
        <div className="menu__links">
          {isMenuOpen && (
            <NavLink
              to="/"
              className={menuLinkActive}
              onClick={isMenuOpen ? closeMenuOpen : ""}
            >
              Главная
            </NavLink>
          )}
          <NavLink
            to="/movies"
            className={menuLinkActive}
            onClick={isMenuOpen ? closeMenuOpen : ""}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={menuLinkActive}
            onClick={isMenuOpen ? closeMenuOpen : ""}
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink
          to="/profile"
          className="menu__link-profile"
          onClick={isMenuOpen ? closeMenuOpen : ""}
        >
          Аккаунт
          <div
            className={`menu__profile-case ${
              location.pathname !== "/" && "menu__profile-case_theme"
            }`}
          >
            <img
              src={logoProfile}
              alt="иконка аккаунта"
              className="menu__profile_logo"
            />
          </div>
        </NavLink>
      </div>
      <button
        className={`menu__burger-button ${
          isMenuOpen ? "menu__burger-button_active" : ""
        }`}
        type="button"
        aria-label="меню"
        onClick={toggleMenuBurger}
      ></button>
    </nav>
  );
}

export default NavigationLogin;
