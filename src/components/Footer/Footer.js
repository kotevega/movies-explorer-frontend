import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__copyright">© 2023</p>
        <ul className="footer__links">
          <li className="footer__link">
            <Link
              to="https://practicum.yandex.ru/"
              className="footer__link"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__link">
            <Link
              to="https://github.com/kotevega"
              className="footer__link"
              target="_blank"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
