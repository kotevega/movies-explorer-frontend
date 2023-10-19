import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Register.css";
import logo from "../../images/header_logo.svg";
import api from "../../utils/MainApi";
import { FormValidation } from "../../utils/useFormValidation";

function Register() {
  const navigate = useNavigate();
  const [resultChanges, setresultChanges] = useState("");
  const [disButton, setDisButton] = useState(true);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
      formValue.name.length !== 0 &&
      formValue.email.length !== 0 &&
      formValue.password.length !== 0
    ) {
      if (
        errors.name.length === 0 &&
        errors.email.length === 0 &&
        errors.password.length === 0
      ) {
        setDisButton(false);
      } else {
        setDisButton(true);
      }
    } else {
      setDisButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = FormValidation(name, value);
    setErrors({ ...errors, [name]: err.fieldName });
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function resetErrMessage() {
    setTimeout(() => {
      setresultChanges("");
    }, 3000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .register(formValue.name, formValue.email, formValue.password)
      .then((res) => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setresultChanges(
          "При регистрации пользователя произошла ошибка. Пожалуйста повторите ещё раз"
        );
        resetErrMessage();
        setDisButton(true);
      });
  };

  return (
    <main className="register">
      <Link to="/" className="register__logo-case">
        <img src={logo} alt="логотип проекта" className="register__logo" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
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
          <span className="register__err-message">{errors.name}</span>
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
          <span className="register__err-message">{errors.email}</span>
        </div>
        <div className="register__case">
          <p className="register__text-input">Пароль</p>
          <input
            className="register__input"
            placeholder="Придумайте пароль"
            type="password"
            name="password"
            required
            minLength="2"
            maxLength="40"
            value={formValue.password}
            onChange={handleChange}
          ></input>
          <span className="register__err-message">{errors.password}</span>
        </div>
        <span className="register__changes-message">{resultChanges}</span>
        <button
          disabled={disButton}
          type="submit"
          className={
            disButton
              ? "register__submit-button_disabled"
              : "register__submit-button"
          }
        >
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
