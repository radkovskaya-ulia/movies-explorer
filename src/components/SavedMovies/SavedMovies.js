import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./SavedMovies.module.scss";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { api } from "../../utils/MainApi";

import {
  setSavedCards,
  setSavedFilteredCards,
} from "../../reducers/moviesDataSlice";

function SavedMovies({ onSearch }) {
  const dispatch = useDispatch();
  const onLikeClick = (card) => {
    api
      .removeCard(card._id)
      .then((data) => {
        dispatch(setSavedCards(savedCards.filter((c) => c._id !== card._id)));
        dispatch(
          setSavedFilteredCards(
            savedFilteredCards.filter((c) => c._id !== card._id)
          )
        );
      })
      .catch((err) => console.log(err.message));
  };

  const infoMoviesMessage = useSelector(
    (state) => state.moviesData.infoMoviesMessage
  );
  const errorMoviesMessage = useSelector(
    (state) => state.moviesData.errorMoviesMessage
  );

  const savedFilteredCards = useSelector(
    (state) => state.moviesData.savedFilteredCards
  );
  const savedCards = useSelector((state) => state.moviesData.savedCards);

  return (
    <>
      <Header />
      <div className={styles.savedMovies}>
        <SearchForm onSearch={onSearch} />
        <Preloader />
        <p
          className={`style.moviesMessage
        ${infoMoviesMessage ? "" : styles.moviesMessage_invisible}`}
        >
          Ничего не найдено
        </p>
        <p
          className={`style.moviesMessage
        ${errorMoviesMessage ? "" : styles.moviesMessage_invisible}`}
        >
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
        <MoviesCardList
          cards={savedFilteredCards}
          savedCards={savedCards}
          onLikeClick={onLikeClick}
        />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
