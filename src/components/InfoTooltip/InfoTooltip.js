import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./InfoTooltip.module.scss";
import { setIsisInfoTooltipOpen } from "../../reducers/popupDataSlice";

function InfoTooltip() {
  const dispatch = useDispatch();
  const infoEditProfileMessage = useSelector(
    (state) => state.userData.infoEditProfileMessage
  );
  const isInfoTooltipOpen = useSelector(
    (state) => state.popupData.isInfoTooltipOpen
  );
  const openClass = isInfoTooltipOpen && "popup_visible";

  const onClose = () => {
    dispatch(setIsisInfoTooltipOpen(false));
  };

  return (
    <div className={`${styles.popup} ${openClass}`}>
      <div className={styles.window}>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
        ></button>
        <div className={styles.container}>
          <p className={styles.infoText}>{infoEditProfileMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
