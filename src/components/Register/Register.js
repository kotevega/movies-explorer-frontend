import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Register.css";
import logo from "../../images/header_logo.svg";
import api from "../../utils/MainApi";

function Register() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .register(formValue.name, formValue.email, formValue.password)
      .then(() => {
        // onSuccess();
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        // onError();
        console.log(`Ошибка: ${err}`);
      });
  };

  return (
    <main className="register">
      <Link to="/" className="register__logo-case">
        <img src={logo} alt="логотип проекта" className="register__logo" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__case">
          <p className="register__text-input">Имя</p>
          <input
            className="register__input"
            placeholder="Введите Ваше имя"
            type="text"
            name="name"
            required
            minLength="2"
            maxLength="40"
            value={formValue.name}
            onChange={handleChange}
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
            value={formValue.email}
            onChange={handleChange}
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
            minLength="2"
            maxLength="40"
            value={formValue.password}
            onChange={handleChange}
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
