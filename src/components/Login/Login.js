import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/header_logo.svg";
import api from "../../utils/MainApi";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        console.log(data)
        console.log(data.cookie)
        onLogin(formValue.email);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        // onError();
        console.log(`Ошибка: ${err}`);
      });
  };

  return (
    <main className="login">
      <Link to="/" className="login__logo-case">
        <img src={logo} alt="логотип проекта" className="login__logo" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__case">
          <p className="login__text-input">E-mail</p>
          <input
            className="login__input"
            placeholder="Введите Ваш e-mail"
            type="email"
            name="email"
            required
            value={formValue.email}
            onChange={handleChange}
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
            minLength="2"
            maxLength="40"
            required
            value={formValue.password}
            onChange={handleChange}
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
