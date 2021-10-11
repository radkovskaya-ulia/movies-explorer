import React from "react";

import styles from "./Portfolio.module.scss";
import row from "../../images/row.svg";

function Portfolio() {
  return (
    <section className={styles.portfolio}>
      <div className={styles.content}>
        <h2 className={styles.title}>Портфолио</h2>
        <div className={styles.container}>
          <a
            className={styles.link}
            href="https://radkovskaya-ulia.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <img
            className={styles.image}
            src={row}
            alt="Изображение стрелки."
          />
        </div>
        <div className={styles.container}>
          <a
            className={styles.link}
            href="https://radkovskaya-ulia.github.io/russian-travel/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <img
            className={styles.image}
            src={row}
            alt="Изображение стрелки."
          />
        </div>
        <div className={styles.container}>
          <a
            className={styles.link}
            href="http://radkovskaya-mesto.nomoredomains.club/"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <img
            className={styles.image}
            src={row}
            alt="Изображение стрелки."
          />
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
