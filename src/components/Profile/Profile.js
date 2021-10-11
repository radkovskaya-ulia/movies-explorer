import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormWithValidation } from "../../hooks/useFormValidation";

import styles from "./Profile.module.scss";
import Header from "../Header/Header";
import {
  setCurrentUser,
  setInfoProfileMessage,
  setLoggedIn,
} from "../../reducers/userDataSlice";
import { api } from "../../utils/MainApi";
import { setIsInfoTooltipOpen } from "../../reducers/popupDataSlice";
import {
  setCards,
  setSavedFilteredCards,
} from "../../reducers/moviesDataSlice";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.userData.currentUser);
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation();

  React.useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .editProfile({ name: values.name, email: values.email })
      .then((data) => {
        dispatch(setCurrentUser(data.data));
        dispatch(setIsInfoTooltipOpen(true));
        dispatch(setInfoProfileMessage("Данные успешно обновлены"));
      })
      .catch((err) => {
        dispatch(setIsInfoTooltipOpen(true));
        dispatch(
          setInfoProfileMessage("Во время обновления данных произошла ошибка")
        );
        console.log(err);
      });
  };

  const onLogout = () => {
    dispatch(setLoggedIn(false));
    localStorage.removeItem("jwt");
    localStorage.removeItem("searchMoviesPhrase");
    localStorage.removeItem("searchMoviesCheck");
    localStorage.removeItem("searchSavedMoviesPhrase");
    localStorage.removeItem("searchSavedMoviesCheck");
    dispatch(setCards([]));
    dispatch(setSavedFilteredCards([]));
    history.push("/signin");
  };

  return (
    <>
      <Header />
      <div className={styles.profile}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Привет, {values.name}!</h2>
          <div className={styles.inputContainer}>
            <label htmlFor="name" className={styles.formLabel}>
              Имя
            </label>
            <input
              className={styles.formInput}
              id="name"
              required
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              pattern="[a-zA-Zа-яА-Я -]{1,}"
              value={values.name || ""}
              onChange={handleChange}
            />
          </div>
          <span className={styles.error} id="name-error">
            {errors.name || ""}
          </span>
          <div className={styles.inputContainer}>
            <label htmlFor="name" className={styles.formLabel}>
              E-mail
            </label>
            <input
              className={styles.formInput}
              id="email"
              required
              name="email"
              type="email"
              value={values.email || ""}
              onChange={handleChange}
            />
          </div>

          <span className={styles.error} id="email-error">
            {errors.email || ""}
          </span>
          <button
            type="submit"
            className={`${styles.button} ${
              isValid && values !== currentUser ? "" : styles.button_disabled
            }`}
            disabled={!(isValid && values !== currentUser)}
          >
            Редактировать
          </button>
          <Link className={styles.link} to="/signin" onClick={onLogout}>
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </>
  );
}

export default Profile;
