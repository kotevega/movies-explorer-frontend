import "./Portfolio.css";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link
            to="https://github.com/kotevega/how-to-learn"
            className="portfolio__link"
          >
            Статичный сайт
          </Link>
          <p className="portfolio__cursor">&#8599;</p>
        </li>
        <li className="portfolio__item">
          <Link
            to="https://github.com/kotevega/russian-travel-project"
            className="portfolio__link"
          >
            Адаптивный сайт
          </Link>
          <p className="portfolio__cursor">&#8599;</p>
        </li>
        <li className="portfolio__item">
          <Link
            to="https://mestokote.nomoreparties.co"
            className="portfolio__link"
          >
            Одностраничное приложение
          </Link>
          <p className="portfolio__cursor">&#8599;</p>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
