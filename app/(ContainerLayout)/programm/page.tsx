import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kim & Stephan | Programm",
};

export default async function Page() {
  return (
    <ContainerLayout>
      <h1 className="heroHeading heading text-center">Programm</h1>

      <dl className="horizontal gap-2">
        <dt>13:00 Uhr</dt>
        <dd>
          💍 Standesamtliche Trauung
          <br />
          <small>
            <em>Planetarium Bochum, Castroper Str. 67, 44791 Bochum</em>
          </small>
        </dd>
        <dt>danach</dt>
        <dd>
          🥂 Das Brautpaar freut sich auf einen gemütlichen Empfang mit euch!
          <p className="mt-2">
            📸 Fotos mit dem Brautpaar, der Familie und natürlich den
            Trauzeugen.
          </p>
        </dd>
        <dt>ab 15:30 Uhr</dt>
        <dd>
          🍺 Unsere Location macht für euch die Pforten auf!
          <br />
          Ihr könnt euch in Ruhe umsehen und euch auf die freie Trauung
          einstimmen, erste Getränke bestellen oder Bändchen für den
          Tierbark-Besuch abholen.
          <br />
          <small>
            <em>Franz Ferdinand, Klinikstraße 51, 44791 Bochum</em>
          </small>
        </dd>
        <dt>16:30 Uhr</dt>
        <dd>💒 Freie Trauung</dd>
        <dt>danach</dt>
        <dd>📸 Fotos mit dem Brautpaar und jedem Gast der gerne möchte!</dd>
        <dt>19:00 Uhr</dt>
        <dd>
          🍝 Eröffnung des Buffets / Überleitung in den kulinarischen Teil des
          Abends
        </dd>
        <dt>~20:30 Uhr</dt>
        <dd>
          🎂 Nachspeisenbuffeteröffnungsritual (Torte wird angeschnitten)!
        </dd>
        <dt>~21:00 Uhr</dt>
        <dd>🎉 Hochzeitstanz, Eröffnung der Tanzfläche, Party</dd>
        <dt>00:00 Uhr</dt>
        <dd>🕛 Mitternachtssnack</dd>
      </dl>
    </ContainerLayout>
  );
}
