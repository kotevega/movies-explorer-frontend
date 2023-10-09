import "./NoFound.css";
import { useNavigate } from "react-router-dom";

function NoFound() {
  const navigate = useNavigate();
  return (
    <main className="no-found">
      <h1 className="no-found__title">404</h1>
      <h2 className="no-found__subtitle">Страница не найдена</h2>
      <button
        className="no-found__back"
        type="button"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </main>
  );
}

export default NoFound;
