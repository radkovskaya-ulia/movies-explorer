import React from "react";

import styles from "./AboutProject.module.scss";
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject() {
  return (
    <section className={styles.project} id="aboutProject">
      <div className={styles.content}>
        <SectionTitle title={"О проекте"} />
        <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>
              Дипломный проект включал 5 этапов
            </p>
            <p className={styles.text}>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>
              На выполнение диплома ушло 5 недель
            </p>
            <p className={styles.text}>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className={styles.blockContainer}>
          <div className={styles.block}>1 неделя</div>
          <div className={styles.block}>4 недели</div>
          <div className={styles.blockComment}>Back-end</div>
          <div className={styles.blockComment}>Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
