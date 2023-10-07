'use client';

import styles from "./Shootingstar.module.css"
import classNames from "classnames";
import {useEffect, useState} from "react";

const animationDuration = 5_000;

export function Shootingstar() {
    const [animate, setAnimate] = useState(false)
    
    useEffect(() => {
        const interval = window.setInterval(() => {
            setAnimate((animate) => !animate)
        }, animationDuration)
        
        return () => window.clearInterval(interval);
    }, []);
    
    return (
        <span className={classNames(styles['shootingstar'], {[styles['animate']]: animate})}></span>
    )
}

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;