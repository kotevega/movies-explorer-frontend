import "./Header.css";
import logo from "../../images/header_logo.svg";
import NavigationLogout from "../Navigation/NavigationLogout/NavigationLogout";
import NavigationLogin from "../Navigation/NavigationLogin/NavigationLogin";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn }) {
  const location = useLocation();
  const headerClassName = `header ${
    location.pathname !== "/" && "header_active"
  }`;

  return (
    <header className={headerClassName}>
      <Link to="/">
        <img src={logo} alt="логотип проекта" className="header__logo" />{" "}
      </Link>
      {isLoggedIn ? <NavigationLogin /> : <NavigationLogout />}
    </header>
  );
}

export default Header;
