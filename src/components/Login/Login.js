import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/header_logo.svg";

function Login() {
  return (
    <main className="login">
      <Link to="/" className="login__logo-case">
        <img src={logo} alt="логотип проекта" className="login__logo" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <div className="login__case">
          <p className="login__text-input">E-mail</p>
          <input
            className="login__input"
            placeholder="Введите Ваш e-mail"
            type="email"
            name="email"
            required
            value="pochta@yandex.ru"
          ></input>
          <span className="login__err-input"></span>
        </div>
        <div className="login__case">
          <p className="login__text-input">Пароль</p>
          <input
            className="login__input"
            placeholder="Введите Ваш пароль"
            type="password"
            name="password"
            minlength="2"
            maxlength="40"
            required
          ></input>
          <span className="login__err-message"></span>
        </div>
        <button type="submit" className="login__submit-button">
          Войти
        </button>
        <Link className="login__login-link" to="/signup">
          Ещё не зарегистрированы?&#8200;
          <span className="login__login-link_color">&#8200;Регистрация</span>
        </Link>
      </form>
    </main>
  );
}

export default Login;
