import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import {
  setIsNagitionOpen
}  from "../../reducers/popupDataSlice";

function Header() {
  const dispatch = useDispatch();

  const isMain = useRouteMatch({ path: "/", exact: true });
  const loggedIn = useSelector((state) => state.userData.loggedIn);

  const handleNavigationClick = () => {
    dispatch(setIsNagitionOpen(true));
  }

  return (
    <div
      className={`${styles.header}
      ${isMain ? styles.header_green : ""}`}
    >
      <div className={styles.content}>
        <Logo />
        <div
          className={`${styles.loginContainer}
          ${loggedIn ? styles.invisible : ""}`}
        >
          <Link className={styles.linkRegistration} to="/signup">
            Регистрация
          </Link>
          <Link className={styles.linkLogin} to="/signin">
            Войти
          </Link>
        </div>
        <div
          className={`${styles.movieContainer}
          ${loggedIn ? "" : styles.invisible}`}
        >
          <Link className={styles.linkMovie} to="/movies">
            Фильмы
          </Link>
          <Link className={styles.linkMovie} to="/saved-movies">
            Сохраненные фильмы
          </Link>
        </div>
        <Link
          className={`${styles.linkAccount}
          ${loggedIn ? "" : styles.invisible}`}
          to="/profile"
        ></Link>
        <button
          className={`${styles.menuButton}
          ${loggedIn ? "" : styles.invisible}`}
          onClick={handleNavigationClick}
        ></button>
      </div>
    </div>
  );
}

export default Header;
