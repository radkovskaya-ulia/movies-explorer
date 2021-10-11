import React from "react";
import logo_web from "../../images/logo_web.svg";
import styles from "./Promo.module.scss";

function Promo() {
  return (
    <section className={styles.promo}>
      <div className={styles.content}>
        <img className={styles.image} src={logo_web} alt="Логотип сайта." />
        <div className={styles.container}>
          <h1 className={styles.title}>
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className={styles.subtitle}>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className={styles.link} href="#aboutProject">
            Узнать больше
          </a>
        </div>
      </div>
    </section>
  );
}

export default Promo;
