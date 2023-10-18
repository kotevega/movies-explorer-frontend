import "./Profile.css";
import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ logOut }) {

  const [disButton, setDisButton] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  const [formValue, setFormValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [dataUser, setDataUser] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  // const [errors, setErrors] = React.useState({})

  useEffect(() => {
    if (
      formValue.name !== dataUser.name ||
      formValue.email !== dataUser.email
    ) {
      setDisButton(false);
    } else {
      setDisButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    

    // if (preg_match('/^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/','Данте'))
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    api
      .patchUserInfoToApi(formValue)
      .then((res) => {
        setDataUser({
          name: res.name,
          email: res.email,
        });
        setDisButton(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
            value={formValue.name || ""}
            onChange={handleChange}
          ></input>
        </div>
        <div className="profile__case">
          <p className="profile__text-input">E-mail</p>
          <input
            className="profile__input"
            placeholder="Введите Ваш e-mail"
            type="email"
            name="email"
            required
            value={formValue.email || ""}
            onChange={handleChange}
          ></input>
        </div>
        <button
          disabled={disButton}
          type="submit"
          // className={isChangeProfile ? "profile__edit-button_disabled" : 'profile__submit-button'/*"profile__edit-button"*/}
          className={
            !disButton
              ? "profile__submit-button"
              : "profile__edit-button_disabled" /*"profile__edit-button"*/
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
