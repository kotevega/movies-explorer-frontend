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
            target="_blank"
          >
            <p className="portfolio__text"> Статичный сайт</p>
            <p className="portfolio__cursor">&#8599;</p>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            to="https://github.com/kotevega/russian-travel-project"
            className="portfolio__link"
            target="_blank"
          >
            <p className="portfolio__text">Адаптивный сайт</p>

            <p className="portfolio__cursor">&#8599;</p>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            to="https://mestokote.nomoreparties.co"
            className="portfolio__link"
            target="_blank"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__cursor">&#8599;</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
