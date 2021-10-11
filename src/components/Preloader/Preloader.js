import React from 'react';
import { useSelector } from "react-redux";

import styles from "./Preloader.module.scss";

function Preloader() {
    const loading = useSelector((state) => state.userData.loading);
    const showClass = loading && styles.visible;

    return (
        <div className={`${styles.preloader} ${showClass}`}>
            <div className={styles.container}>
                <span className={styles.round}></span>
            </div>
        </div>
    )
};

export default Preloader
