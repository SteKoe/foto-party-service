import React from "react";
import Image from "next/image";

const alt = `
Ein ekelhaft gutaussehendes und mindestens genauso verliebtes Paar, sitzt sich küssend auf einer Bank auf stein.
`;

export const HeroImage = () => {
  return (
    <span className="cover-image relative">
      <Image
        src="/img/hero.jpg"
        width={1024}
        height={256}
        alt={alt}
        className="mx-auto rounded shadow-xl md:rounded-xl"
      />
    </span>
  );
};
