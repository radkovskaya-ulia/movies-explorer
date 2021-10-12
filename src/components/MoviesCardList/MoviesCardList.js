import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import styles from "./MoviesCardList.module.scss";
import MoviesCard from "../MoviesCard/MoviesCard";
import { setNumCards } from "../../reducers/moviesDataSlice";

function MoviesCardList({ cards, savedCards, onLikeClick }) {
  const dispatch = useDispatch();

  const numCards = useSelector((state) => state.moviesData.numCards);
  const width = useSelector((state) => state.moviesData.width);

  const downloadAllCard = cards.length <= numCards;
  const isMovies = useRouteMatch({ path: "/movies", exact: true });

  const handleShowMoreCards = () => {
    if (width < 1280) {
      dispatch(setNumCards(numCards + 2));
    } else {
      dispatch(setNumCards(numCards + 4));
    }
  };

  return (
    <section className={styles.cardList}>
      <ul className={styles.itemList}>
        {[...cards]
          .filter((card, num) => num < numCards)
          .map((filterCard) => (
            <MoviesCard
              key={`${isMovies ? filterCard.id : filterCard._id}`}
              card={filterCard}
              onLikeClick={onLikeClick}
              savedCards={savedCards}
            ></MoviesCard>
          ))}
      </ul>
      <button
        type="button"
        className={`${styles.moreButton}
        ${downloadAllCard ? styles.moreButton_invisible : ""}`}
        onClick={handleShowMoreCards}
      >
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
