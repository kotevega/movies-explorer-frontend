import "./Profile.css";
import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { FormValidation } from "../../utils/useFormValidation";

function Profile({ logOut, setCurrentUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [resultChanges, setresultChanges] = useState("");
  const [disButton, setDisButton] = useState(true);
  const [formValue, setFormValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [dataUser, setDataUser] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setFormValue({ name: currentUser.name, email: currentUser.email });
    setDataUser({ name: currentUser.name, email: currentUser.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (
      formValue.name !== dataUser.name ||
      formValue.email !== dataUser.email
    ) {
      if (errors.name.length === 0 && errors.email.length === 0) {
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

  function handleSubmit(e) {
    e.preventDefault();
    api
      .patchUserInfoToApi(formValue)
      .then((res) => {
        setCurrentUser({
          name: res.user.name,
          email: res.user.email,
        });
        setDataUser({
          name: res.user.name,
          email: res.user.email,
        });
        setDisButton(true);
        setresultChanges(res.message);
        resetErrMessage();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setresultChanges(
          "При редактировании профиля произошла ошибка. Пожалуйста повторите ещё раз"
        );
        resetErrMessage();
        setDisButton(true);
      });
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {dataUser.name}!</h1>
      <form className="profile__form">
        <div className="profile__case">
          <p className="profile__text-input">Имя</p>
          <input
            className="profile__input"
            placeholder="Введите Ваше имя"
            type="text"
            name="name"
            required
            minLength="2"
            maxLength="40"
            value={formValue.name}
            onChange={handleChange}
          ></input>
        </div>
        {errors.name && (
          <span className="profile__err-message">{errors.name}</span>
        )}
        <div className="profile__case">
          <p className="profile__text-input">E-mail</p>
          <input
            className="profile__input"
            placeholder="Введите Ваш e-mail"
            type="email"
            name="email"
            required
            value={formValue.email}
            onChange={handleChange}
          ></input>
        </div>
        {errors.email && (
          <span className="profile__err-message">{errors.email}</span>
        )}
        <span className="profile__changes-message">{resultChanges}</span>
        <button
          disabled={disButton}
          type="submit"
          className={
            disButton ? "profile__edit-button_disabled" : "profile__edit-button"
          }
          onClick={handleSubmit}
        >
          Редактировать
        </button>
        <button className="profile__logout" type="button" onClick={logOut}>
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
}

export default Profile;
