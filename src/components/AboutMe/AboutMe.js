import React from "react";

import styles from "./AboutMe.module.scss";
import SectionTitle from "../SectionTitle/SectionTitle";
import photo from "../../images/author.jpg";

function AboutMe() {
  return (
    <section className={styles.author}>
      <div className={styles.content}>
        <SectionTitle title={"Студент"} />
        <div className={styles.mainContainer}>
          <img className={styles.photo} src={photo} alt="Фотография автора." />
          <div className={styles.container}>
            <div className={styles.textContainer}>
              <p className={styles.name}>Юля</p>
              <p className={styles.bio}>Фронтенд-разработчик, 30 лет</p>
              <p className={styles.text}>
                Я родилась и живу в Москве, закончила факультет прикладной
                математики института электроники и математики(МГИЭМ). У меня
                есть муж и маленький сын. Я люблю решать загадки, кататься на
                сноуборде и плавать. Все время работала в IT (поддержка,
                внедренее, аналитика). В прошлом году ушла в декрет, открыла для
                себя Фронтенд разработку и влюбилась. Планирую далее развиваться
                именно в этом направлении.
              </p>
            </div>
            <div className={styles.linkContainer}>
              <a
                className={styles.link}
                href="https://www.facebook.com/julia.radkovskaya"
              >
                Facebook
              </a>
              <a
                className={styles.link}
                href="https://github.com/radkovskaya-ulia"
              >
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
