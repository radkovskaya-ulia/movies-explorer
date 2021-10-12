import React from "react";
import { useRouteMatch } from "react-router-dom";

import styles from "./MoviesCard.module.scss";

function MoviesCard({ card, onLikeClick, savedCards }) {
  const isMovies = useRouteMatch({ path: "/movies", exact: true });
  const [isLiked, setIsLiked] = React.useState(
    savedCards.some((i) => i.movieId === card.id)
  );

  const handleLikeClick = () => {
    if (isMovies) {
      setIsLiked(!isLiked);
      onLikeClick(
        {
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: `https://api.nomoreparties.co${card.image.url}`,
          trailer: card.trailerLink,
          thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
          movieId: card.id,
        },
        isLiked
      );
    } else {
      onLikeClick(card);
    }
  };

  const cardLikeButtonClassName = `${styles.likeButton}
  ${isMovies ? "" : styles.likeButton_delete}
  ${isLiked ? styles.likeButton_active : ""}`;

  return (
    <li className={styles.card}>
      <a className={styles.imageLink} href={card.trailerLink}>
        <img
          className={styles.image}
          src={`${
            isMovies
              ? `https://api.nomoreparties.co${card.image.url}`
              : card.image
          } `}
          alt={`Картинка фильма "${card.nameRU}".`}
        />
      </a>
      <div className={styles.container}>
        <h2 className={styles.title}>{card.nameRU}</h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
      </div>
      <p className={styles.duration}>
        {parseInt(card.duration / 60)}ч {card.duration % 60}м
      </p>
    </li>
  );
}

export default MoviesCard;
