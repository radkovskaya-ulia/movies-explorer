import React from "react";
import styles from "./Techs.module.scss";
import SectionTitle from "../SectionTitle/SectionTitle";

function Tech() {
  return (
    <section className={styles.techs}>
      <div className={styles.content}>
        <SectionTitle title={"Технологии"} />
        <div className={styles.container}>
          <p className={styles.subtitle}>7 технологий</p>
          <p className={styles.text}>
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className={styles.itemList}>
          <li className={styles.item}>HTML</li>
          <li className={styles.item}>CSS</li>
          <li className={styles.item}>JS</li>
          <li className={styles.item}>React</li>
          <li className={styles.item}>Git</li>
          <li className={styles.item}>Express.js</li>
          <li className={styles.item}>MongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Tech;
