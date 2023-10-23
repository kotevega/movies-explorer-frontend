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
  const [checkTokenLogin, setCheckTokenLogin] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const locationFooter =
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies";

  const locationHeader = locationFooter || location.pathname === "/profile";

  if (
    isLoggedIn &&
    (location.pathname === "/signup" || location.pathname === "/signin")
  ) {
    navigate("/movies", { replace: true });
  }

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
    setCheckTokenLogin(true);
  }

  function checkToken() {
    api
      .checkTokenApi()
      .then((res) => {
        if (!res) {
          return;
        }
        handleLogin();
      })
      .catch((err) => {
        setLoggedIn(false);
        setCheckTokenLogin(true);

        console.log(`Ошибка: ${err}`);
      });
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logOut() {
    // setCheckTokenLogin(true);
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
          {checkTokenLogin && (
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/*" element={<NoFound />} />
              <Route path="/signin" element={<Login onLogin={handleLogin} />} />
              <Route
                path="/signup"
                element={<Register onLogin={handleLogin} />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={Profile}
                    logOut={logOut}
                    setCurrentUser={setCurrentUser}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} element={Movies} />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={SavedMovies}
                  />
                }
              />
            </Routes>
          )}
          {locationFooter && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
