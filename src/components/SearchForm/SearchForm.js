import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import styles from "./SearchForm.module.scss";
import magnifier from "../../images/magnifier.svg";
import { setChecked, setPhrase } from "../../reducers/searchDataSlice";

function SearchForm({ onSearch }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const checked = useSelector((state) => state.searchData.checked);
  const phrase = useSelector((state) => state.searchData.phrase);
  const seachInputError = useSelector(
    (state) => state.moviesData.seachInputError
  );

  React.useEffect(() => {
    if (location.pathname === "/movies") {
      if (
        localStorage.getItem("searchMoviesPhrase") !== null &&
        localStorage.getItem("searchMoviesCheck") !== null
      ) {
        dispatch(setPhrase(localStorage.getItem("searchMoviesPhrase")));
        if (localStorage.getItem("searchMoviesCheck") === "true") {
          dispatch(setChecked(true));
        } else if (localStorage.getItem("searchMoviesCheck") === "false")
          dispatch(setChecked(false));
      }
    } else {
      if (
        localStorage.getItem("searchSavedMoviesPhrase") !== null &&
        localStorage.getItem("searchSavedMoviesCheck") !== null
      ) {
        setPhrase(localStorage.getItem("searchSavedMoviesPhrase"));
        if (localStorage.getItem("searchSavedMoviesCheck") === "true") {
          dispatch(setChecked(true));
        } else if (localStorage.getItem("searchSavedMoviesCheck") === "false")
          dispatch(setChecked(false));
      }
    }
  }, [location]);

  const handleChangeCheck = (e) => {
    dispatch(setChecked(!checked));
  };
  const handleChangePhrase = (e) => {
    dispatch(setPhrase(e.target.value));
  };

  function handleSumbit(e) {
    e.preventDefault();
    onSearch({
      phrase: phrase,
      check: checked,
    });
  }

  return (
    <section className={styles.searchform}>
      <form className={styles.form} onSubmit={handleSumbit}>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <img
              className={styles.searchImage}
              src={magnifier}
              alt="Иконка лупы."
            />
            <input
              type="text"
              name="filmname"
              className={styles.input}
              placeholder="Фильм"
              value={phrase || ""}
              onChange={handleChangePhrase}
            />
          </div>
          <button type="submit" className={styles.button}></button>
        </div>
        <label className={styles.label}>
          <input
            type="checkbox"
            className={styles.invisibleCheckbox}
            checked={checked}
            onChange={handleChangeCheck}
          />
          <span className={styles.visibleCheckbox}></span>
          <span className={styles.labelText}>Короткометражки</span>
        </label>
      </form>
      <p
        className={`${styles.inputError} ${
          seachInputError ? "" : styles.inputError_invisible
        }
        }`}
      >
        Нужно ввести ключевое слово
      </p>
    </section>
  );
}

export default SearchForm;
