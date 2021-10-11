import React from "react";

import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.nameProject}>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className={styles.container}>
          <div className={styles.linkContainer}>
            <a
              className={styles.link}
              href="https://praktikum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              className={styles.link}
              href="https://github.com/radkovskaya-ulia"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              className={styles.link}
              href="https://www.facebook.com/julia.radkovskaya"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
          <p className={styles.copyright}>&copy;2021</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
