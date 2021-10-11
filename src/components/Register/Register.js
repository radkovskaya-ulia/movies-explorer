import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./Register.module.scss";
import AuthForm from "../AuthForm/AuthForm";
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { setLoggedIn, setErrorAuthMessage } from "../../reducers/userDataSlice";
import * as auth from "../../utils/auth";

function Register({ onRegister, errorAuthMessage }) {
  const history = useHistory();
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    resetFrom({});
  }, [resetFrom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setErrorAuthMessage(false));
    return auth
      .register(values)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        dispatch(setLoggedIn(true));
        history.push("/movies");
      })
      .catch((err) => {
        dispatch(setErrorAuthMessage(true));
      });
  };

  return (
    <div className={styles.register}>
      <Logo />
      <AuthForm
        buttonText="Зарегистрироваться"
        title="Добро пожаловать!"
        link="/signin"
        linkText="Войти"
        authText="Уже зарегистрированы?"
        handleSubmit={handleSubmit}
        isDisabled={!isValid}
      >
        <label htmlFor="name" className={styles.formLabel}>
          Имя
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
          <span className="error" id="name-error">
            {errors.name || ""}
          </span>
        </label>

        <label htmlFor="email" className={styles.formLabel}>
          E-mail
          <input
            className={styles.formInput}
            id="email"
            required
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email || ""}
          />
          <span className="error" id="email-error">
            {errors.email || ""}
          </span>
        </label>

        <label htmlFor="password" className={styles.formLabel}>
          Пароль
          <input
            className={styles.formInput}
            id="password"
            required
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.password || ""}
          />
          <span className={styles.error} id="password-error">
            {errors.password || ""}
          </span>
        </label>
      </AuthForm>
    </div>
  );
}

export default Register;
