'use client';

import React, {useEffect} from "react";
import {parallax} from "@/utils/parallax";
import Image from "next/image";

export const HeroImage = () => {
    useEffect(() => {
        const parallaxIt = parallax('.cover-image')

        const root = document.querySelector('.cover-image');
        const mousemoveListener = (e: Event) => {
            parallaxIt(e as MouseEvent, ".parallax-img", -5);
        };

        root?.addEventListener("mousemove", mousemoveListener);

        return () => {
            root?.removeEventListener("mousemove", mousemoveListener)
        }
    }, []);

    return (
        <span className=" relative overflow-hidden cover-image">
            <Image src="/img/hero.jpg" width={1024} height={256} alt="" className="rounded-2xl bg-image mx-auto parallax-bg"/>
            <Image src="/img/hero-characters.webp" width={1024} height={256} alt=""
                   className="absolute inset-0 parallax-img mx-auto"/>
        </span>
    )
}