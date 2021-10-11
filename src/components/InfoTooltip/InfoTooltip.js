import React from "react";

import styles from "./InfoTooltip.module.scss";

function InfoTooltip({ isOpen, onClose, infoProfileMessage }) {
  const openClass = isOpen && "popup_visible";

  return (
    <div className={`${styles.popup} ${openClass}`}>
      <div className={styles.window}>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
        ></button>
        <div className={styles.container}>
          <p className={styles.infoText}>{infoProfileMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
