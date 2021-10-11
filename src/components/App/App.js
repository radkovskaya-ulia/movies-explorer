import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./App.module.scss";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Navigation from "../Navigation/Navigation";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { moviesApi } from "../../utils/MoviesApi";
import { api } from "../../utils/MainApi";
import * as auth from "../../utils/auth";

import { setCurrentUser, setLoggedIn } from "../../reducers/userDataSlice";
import {
  setCards,
  setSavedCards,
  setSavedFilteredCards,
  setWidth,
  setNumCards,
  setLoading,
  setInfoMoviesMessage,
  setInfoSavedMoviesMessage,
  setErrorMoviesMessage,
} from "../../reducers/moviesDataSlice";

import { setSeachInputError } from "../../reducers/searchDataSlice";

function App() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userData.loggedIn);
  const savedCards = useSelector((state) => state.moviesData.savedCards);
  const width = useSelector((state) => state.moviesData.width);

  //Проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        dispatch(setLoggedIn(true));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Запрос данных о пользователе и карточках, если пользователь залогинен
  React.useEffect(() => {
    if (loggedIn) {
      const promises = [api.getUserInfo(), api.getCards()];
      Promise.all(promises)
        .then(([userData, cards]) => {
          dispatch(setCurrentUser(userData.data));
          dispatch(setLoggedIn(true));
          dispatch(
            setSavedCards(
              cards.data.filter((card) => card.owner === userData.data._id)
            )
          );
          if (
            localStorage.getItem("searchMoviesPhrase") !== null &&
            localStorage.getItem("searchMoviesCheck") !== null
          ) {
            handleSearchMovies({
              phrase: localStorage.getItem("searchMoviesPhrase"),
              check: localStorage.getItem("searchMoviesCheck"),
            });
          }
          if (
            localStorage.getItem("searchSavedMoviesPhrase") !== null &&
            localStorage.getItem("searchSavedMoviesCheck") !== null
          ) {
            handleSearchSavedMovies({
              phrase: localStorage.getItem("searchSavedMoviesPhrase"),
              check: localStorage.getItem("searchSavedMoviesCheck"),
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      if (location.pathname === "movies") {
        history.push("/movies");
      } else {
        history.push("/");
      }
    }
  }, [loggedIn, history]);

  //Расчет карточек в зависимости от разрешения
  const handleSetNumCards = () => {
    dispatch(setWidth(document.documentElement.clientWidth));
    if (width < 768) {
      dispatch(setNumCards(5));
    } else if (width >= 768 && width < 1280) {
      dispatch(setNumCards(8));
    } else {
      dispatch(setNumCards(12));
    }
  };

  // Фильтрация карточек
  const filterCards = (cards, request) => {
    const filerByNameCard = cards.filter(
      (card) =>
        card.nameRu !== null &&
        card.nameEN !== null &&
        card.counry !== null &&
        (card.nameRU.toLowerCase().includes(request.phrase.toLowerCase()) ||
          card.nameEN.toLowerCase().includes(request.phrase.toLowerCase()))
    );
    if (request.check === "true" || request.check === true) {
      return filerByNameCard.filter(
        (card) => parseInt(card.duration / 60) === 0
      );
    } else {
      return filerByNameCard;
    }
  };

  // Получение карточек из moviesApi
  function handleGetCards() {
    dispatch(setLoading(true));
    moviesApi
      .getCards()
      .then((data) => {
        localStorage.setItem("moviesCards", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMoviesMessage(true);
      })
      .finally(() => dispatch(setLoading(false)));
  }

  // Рендер карточек фильмов
  function handleSearchMovies(request) {
    dispatch(setInfoMoviesMessage(false));
    dispatch(setErrorMoviesMessage(false));
    dispatch(setSeachInputError(false));
    if (request.phrase === "") {
      dispatch(setSeachInputError(true));
      return;
    }
    if (localStorage.getItem("moviesCards") == null) {
      handleGetCards();
    }
    if (localStorage.getItem("moviesCards") !== null) {
      localStorage.setItem("searchMoviesPhrase", request.phrase);
      localStorage.setItem("searchMoviesCheck", String(request.check));
      const filteredCards = filterCards(
        JSON.parse(localStorage.getItem("moviesCards")),
        request
      );
      dispatch(setCards(filteredCards));
      localStorage.setItem("filteredMoviesCard", JSON.stringify(filteredCards));
      if (filteredCards.length === 0) {
        dispatch(setInfoMoviesMessage(true));
      } else {
        dispatch(setInfoMoviesMessage(false));
      }
      handleSetNumCards();
    }
  }

  // Рендер карточек сохраненных фильмов
  function handleSearchSavedMovies(request) {
    dispatch(setInfoSavedMoviesMessage(false));
    dispatch(setSeachInputError(false));
    if (request.phrase === "") {
      setSeachInputError(true);
      return;
    }
    if (savedCards) {
      localStorage.setItem("searchSavedMoviesPhrase", request.phrase);
      localStorage.setItem("searchSavedMoviesCheck", String(request.check));
      const filteredCards = filterCards(savedCards, request);
      dispatch(setSavedFilteredCards(filteredCards));
      dispatch(setNumCards(filteredCards.length));
      if (filteredCards.length === 0) {
        dispatch(setInfoSavedMoviesMessage(true));
      } else {
        dispatch(setInfoSavedMoviesMessage(false));
      }
      handleSetNumCards(filteredCards.length);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            onSearch={handleSearchMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            onSearch={handleSearchSavedMovies}
          />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="*">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Navigation />
        <InfoTooltip />
      </div>
    </div>
  );
}

export default App;
