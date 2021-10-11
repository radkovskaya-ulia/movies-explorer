import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Navigation.module.scss";
import { setIsNagitionOpen } from "../../reducers/popupDataSlice";

function Navigation() {
  const dispatch = useDispatch();
  const isNavigationOpen = useSelector(
    (state) => state.popupData.isNavigationOpen
  );

  const onClose = () => {
    dispatch(setIsNagitionOpen(false));
  };

  const openClass = isNavigationOpen && "navigation_visible";

  return (
    <div className={`${styles.navigation} ${openClass}`}>
      <div className={styles.content}>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Кнопка закрытия меню навигации."
        ></button>
        <div className={styles.linkContainer}>
          <NavLink
            activeClassName={styles.link_active}
            className={styles.link}
            exact
            to="/"
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            activeClassName={styles.link_active}
            className={styles.link}
            to="/movies"
            onClick={onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            activeClassName={styles.link_active}
            className={styles.link}
            to="/saved-movies"
            onClick={onClose}
          >
            Сохраненные фильмы
          </NavLink>
        </div>
        <NavLink
          className={styles.linkAccount}
          to="/profile"
          onClick={onClose}
        ></NavLink>
      </div>
    </div>
  );
}

export default Navigation;
