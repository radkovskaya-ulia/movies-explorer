import React from "react";
import { Link } from "react-router-dom";

import styles from "./Logo.module.scss";

function Logo() {
  return <Link className={styles.logo} to="/"></Link>;
}

export default Logo;
