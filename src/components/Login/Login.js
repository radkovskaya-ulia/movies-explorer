import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import AuthForm from "../AuthForm/AuthForm";
import Logo from "../Logo/Logo";
import styles from "./Login.module.scss";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { setLoggedIn, setErrorAuthMessage } from "../../reducers/userDataSlice";
import * as auth from "../../utils/auth";

function Login() {
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
      .authorize(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          dispatch(setLoggedIn(true));
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setErrorAuthMessage(true));
      });
  };

  return (
    <div className={styles.login}>
      <Logo />
      <AuthForm
        buttonText="Войти"
        title="Рады видеть"
        link="/signup"
        linkText="Регистрация"
        authText="Еще не зарегистрированы?"
        handleSubmit={handleSubmit}
        isDisabled={!isValid}
      >
        <label htmlFor="email" className={styles.formLabel}>
          E-mail
          <input
            className={styles.formInput}
            id="email"
            required
            name="email"
            type="email"
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className={styles.error} id="email-error">
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
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className={styles.error} id="password-error">
            {errors.password || ""}
          </span>
        </label>
      </AuthForm>
    </div>
  );
}

export default Login;
