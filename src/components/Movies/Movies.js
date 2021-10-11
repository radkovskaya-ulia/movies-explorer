import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Movies.module.scss";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { api } from "../../utils/MainApi";
import {
  setSavedCards,
  setSavedFilteredCards,
} from "../../reducers/moviesDataSlice";

function Movies({ onSearch }) {
  const dispatch = useDispatch();
  const onLikeClick = (data, isLiked) => {
    if (isLiked) {
      const deleteCard = savedCards.filter(
        (card) => card.movieId === data.movieId
      )[0];
      api
        .removeCard(deleteCard._id)
        .then((data) => {
          dispatch(
            setSavedCards(savedCards.filter((c) => c._id !== deleteCard._id))
          );
          dispatch(
            setSavedFilteredCards(
              savedCards.filter((c) => c._id !== deleteCard._id)
            )
          );
        })
        .catch((err) => console.log(err.message));
    } else {
      api
        .addCard(data)
        .then((data) => {
          dispatch(setSavedCards([...savedCards, data.data]));
        })
        .catch((err) => console.log(err.message));
    }
  };

  const savedCards = useSelector((state) => state.moviesData.savedCards);

  const infoMoviesMessage = useSelector(
    (state) => state.moviesData.infoMoviesMessage
  );
  const errorMoviesMessage = useSelector(
    (state) => state.moviesData.errorMoviesMessage
  );

  const cards = useSelector((state) => state.moviesData.cards);

  return (
    <>
      <Header />
      <div className={styles.movies}>
        <SearchForm onSearch={onSearch} />
        <Preloader />
        <p
          className={`${styles.moviesMessage}
        ${infoMoviesMessage ? "" : styles.moviesMessage_invisible}`}
        >
          Ничего не найдено
        </p>
        <p
          className={`${styles.moviesMessage}
        ${errorMoviesMessage ? "" : styles.moviesMessage_invisible}`}
        >
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
        <MoviesCardList
          cards={cards}
          savedCards={savedCards}
          onLikeClick={onLikeClick}
        />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
