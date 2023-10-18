import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NoFound from "../NoFound/NoFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import api from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../../utils/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const locationFooter =
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies";

  const locationHeader = locationFooter || location.pathname === "/profile";

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfoFromApi()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [isLoggedIn]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function checkToken() {
    api
      .checkTokenApi()
      .then((res) => {
        if (!res) {
          return;
        }
        handleLogin();
        // navigate("/movies", { replace: true });
      })
      .catch((evt) => {
        setLoggedIn(false);
        console.log(`Ошибка: ${evt}`);
      });
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logOut() {
    api
      .signOut()
      .then((res) => {
        if (!res) {
          return;
        }
        setLoggedIn(false);
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((evt) => {
        console.log(`Ошибка: ${evt}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          {locationHeader && <Header isLoggedIn={isLoggedIn} />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/*" element={<NoFound />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  logOut={logOut}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} />
              }
            />
          </Routes>
          {locationFooter && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
