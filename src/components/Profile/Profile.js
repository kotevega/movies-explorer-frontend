import "./Profile.css";
import { Link } from "react-router-dom";
import React from "react";

function Profile() {
  const [isChangeProfile, setIsChangeProfile] = React.useState(false);

  function toggleButtonProfile() {
    setIsChangeProfile(!isChangeProfile);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <div className="profile__case">
          <p className="profile__text-input">Имя</p>
          <input
            className="profile__input"
            placeholder="Введите Ваше имя"
            type="text"
            name="name"
            required
            value="Виталий"
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
            value="pochta@yandex.ru"
          ></input>
        </div>
        <button
          type={isChangeProfile ? "button" : "submit"}
          className={
            isChangeProfile ? "profile__submit-button" : "profile__edit-button"
          }
          onClick={toggleButtonProfile}
        >
          {isChangeProfile ? "Сохранить" : "Редактировать"}
        </button>
        {!isChangeProfile ? (
          <Link className="profile__logout" to="/signin">
            Выйти из аккаунта
          </Link>
        ) : (
          ""
        )}
      </form>
    </section>
  );
}

export default Profile;
