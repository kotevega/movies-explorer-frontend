import "./NoFound.css";
import { useNavigate } from "react-router-dom";

function NoFound() {
  const navigate = useNavigate();
  return (
    <section className="no-found">
      <h1 className="no-found__title">404</h1>
      <h2 className="no-found__subtitle">Страница не найдена</h2>
      <button className="no-found__back" onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
}

export default NoFound;
