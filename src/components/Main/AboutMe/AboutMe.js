import "./AboutMe.css";
import { Link } from "react-router-dom";
import photo from "../../../images/author_photo.jpg";

function AboutMe() {
  return (
    <section className="author">
      <h2 className="author__title">Студент</h2>
      <div className="author__container">
        <div className="author__about">
          <h3 className="author__name">Константин</h3>
          <p className="author__occupation">Фронтенд-разработчик, 34 года</p>
          <p className="author__biography">
            Я родился и живу в г. Калининграде, закончил экономический факультет
            БФУ им. И. Канта. Я люблю живопись, увлекаюсь плаванием,
            велоспортом, сквошем и шахматами. Недавно начал кодить. С 2015 года
            работал в мастерской по изготовлению предметов для художников из
            дерева. После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с работы.
          </p>
          <Link
            to="https://github.com/kotevega"
            className="author__repository"
            target="_blank"
          >
            Github
          </Link>
        </div>
        <img
          className="author__photo"
          src={photo}
          alt="фото автора проекта"
        ></img>
      </div>
    </section>
  );
}

export default AboutMe;
