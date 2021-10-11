import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./AuthForm.module.scss";

function AuthForm({
  children,
  buttonText,
  title,
  link,
  linkText,
  authText,
  handleSubmit,
  isDisabled = false,
}) {
  const errorAuthMessage = useSelector(
    (state) => state.userData.errorAuthMessage
  );
  return (
    <>
      <div className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>{title}</h2>
          {children}
          <p
            className={`{styles.error}
        ${errorAuthMessage ? "" : styles.errorInvisible}`}
          >
            Что-то пошло не так ...
          </p>
          <button
            type="submit"
            className={`${styles.button} ${
              isDisabled && styles.button_disabled
            }`}
            disabled={isDisabled}
          >
            {buttonText}
          </button>
        </form>
        <div className={styles.linkContainer}>
          <p className={styles.text}>{authText}</p>
          <Link className={styles.link} to={link}>
            {linkText}
          </Link>
        </div>
      </div>
    </>
  );
}

export default AuthForm;
