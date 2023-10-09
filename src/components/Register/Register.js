import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/header_logo.svg";

function Register() {
  return (
    <main className="register">
      <Link to="/" className="register__logo-case">
        <img src={logo} alt="логотип проекта" className="register__logo" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <div className="register__case">
          <p className="register__text-input">Имя</p>
          <input
            className="register__input"
            placeholder="Введите Ваше имя"
            type="text"
            name="name"
            required
            minlength="2"
            maxlength="40"
            value="Виталий"
          ></input>
          <span className="register__err-input"></span>
        </div>
        <div className="register__case">
          <p className="register__text-input">E-mail</p>
          <input
            className="register__input"
            placeholder="Введите Ваш e-mail"
            type="email"
            name="email"
            required
            value="pochta@yandex.ru"
          ></input>
          <span className="register__err-input"></span>
        </div>
        <div className="register__case">
          <p className="register__text-input">Пароль</p>
          <input
            className="register__input register__input_err"
            placeholder="Придумайте пароль"
            type="password"
            name="password"
            required
            minlength="2"
            maxlength="40"
            value="pochta@yandex.ru"
          ></input>
          <span className="register__err-message">Что-то пошло не так...</span>
        </div>
        <button type="submit" className="register__submit-button">
          Зарегистрироваться
        </button>
        <Link className="register__login-link" to="/signin">
          Уже зарегистрированы?&#8200;
          <span className="register__login-link_color">&#8200;Войти</span>
        </Link>
      </form>
    </main>
  );
}

export default Register;
