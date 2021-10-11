import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFound.module.scss";

function NotFound() {
  return (
    <div className="notfound">
      <div className={styles.container}>
        <h2 className={styles.title}>404</h2>
        <p className={styles.subtitle}>Страница не найдена</p>
      </div>
      <Link className={styles.link} to="/">
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
