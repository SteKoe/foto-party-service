'use client';

import styles from "./Shootingstar.module.css"
import {useEffect} from "react";

const random = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min)) + min;
}

export function Shootingstar() {
    useEffect(() => {
        const initStar = () => {
            const shootingStars = document.querySelectorAll(`.${styles['shootingstar']}`);

            shootingStars.forEach((star) => {
                star.style?.setProperty("--deg", `${180 + random(-25, 25)}deg`);
                star.style?.setProperty("--top", `${20 + random(0, 25)}%`);
            });
        };

        const interval = window.setInterval(initStar, 25000);
        
        return () => window.clearTimeout(interval);
    }, []);
    
    return (
        <span className={styles['shootingstar']}></span>
    )
}