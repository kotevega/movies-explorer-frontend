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
        <nav className="footer__nav">
          <Link to="https://practicum.yandex.ru/" className="footer__link">
            Яндекс.Практикум
          </Link>
          <Link to="https://github.com/kotevega" className="footer__link">
            Github
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
