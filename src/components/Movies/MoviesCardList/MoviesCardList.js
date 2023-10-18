import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  isSavedMovieCard,
  allMovieCards,
  searchQuery,
  cards,
  isPreloader,
  searchError,
  setIsSavedMovieCard,
  setFilterMovieCards
}) {
  return (
    <section className="cards">
      <span
        className={`cards__error ${searchError ? "cards__error_active" : ""}`}
      >
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </span>
      {isPreloader ? (
        <Preloader />
      ) : (
        <ul className="card-list">
          {cards.map((card) => (
            <MoviesCard key={card.id ?? card._id} card={card} isSavedMovieCard={isSavedMovieCard} setIsSavedMovieCard={setIsSavedMovieCard} setFilterMovieCards={setFilterMovieCards}/>
          ))}
          {allMovieCards.length !== 0 &&
          cards.length === 0 &&
          searchQuery.length !== 0 ? (
            <span className={`cards__error_active`}>Ничего не найдено</span>
          ) : (
            ""
          )}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
