import "./Login.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/header_logo.svg";
import api from "../../utils/MainApi";
import { FormValidation } from "../../utils/useFormValidation";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [disButton, setDisButton] = useState(true);
  const [resultChanges, setresultChanges] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (formValue.email.length !== 0 && formValue.password.length !== 0) {
      if (errors.email.length === 0 && errors.password.length === 0) {
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
    e.preventDefault();

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
      .authorize(formValue.email, formValue.password)
      .then((res) => {
        onLogin(formValue.email);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setresultChanges(
          "При авторизации произошла ошибка. Пожалуйста повторите ещё раз"
        );
        resetErrMessage();
        setDisButton(true);
      });
  };

  return (
    <main className="login">
      <Link to="/" className="login__logo-case">
        <img src={logo} alt="логотип проекта" className="login__logo" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" noValidate onSubmit={handleSubmit}>
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
          <span className="login__err-message">{errors.email}</span>
        </div>
        <div className="login__case">
          <p className="login__text-input">Пароль</p>
          <input
            className="login__input"
            placeholder="Введите Ваш пароль"
            type="password"
            name="password"
            minLength="2"
            maxLength="15"
            required
            value={formValue.password}
            onChange={handleChange}
          ></input>
          <span className="login__err-message">{errors.password}</span>
        </div>
        <span className="login__changes-message">{resultChanges}</span>
        <button
          disabled={disButton}
          type="submit"
          className={
            disButton ? "login__submit-button_disabled" : "login__submit-button"
          }
        >
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
