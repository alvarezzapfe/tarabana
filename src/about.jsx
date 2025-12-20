// src/about.jsx
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/css/about.css";

import TapImg from "./assets/images/tap.png"; // misma imagen provisional

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 10,000 L/mes => 120,000 L/año => 1,200 hL/año
  const hlAnnual = 1200;

  const steps = [
    {
      year: "2021",
      title: "Nace Tarabaña",
      desc: "Fundamos la cervecería y arrancamos con una planta de 300 litros de capacidad.",
      tag: "Origen",
    },
    {
      year: "2024–2025",
      title: "Diferenciación por calidad",
      desc: "Elevamos estándares: control, consistencia y ejecución. Nos obsesionamos con la experiencia en cada pinta.",
      tag: "Calidad",
    },
    {
      year: "2026",
      title: "Nueva planta en Lerma",
      desc: `Inicia operación una nueva planta con capacidad de 10,000 litros mensuales (≈ ${hlAnnual.toLocaleString()} hL anuales).`,
      tag: "Escala",
    },
  ];

  return (
    <div className="t-aboutPage">
      <Navbar />

      <main className="t-aboutWrap">
        <div className="t-aboutBg" aria-hidden />
        <div className="t-aboutGrid" aria-hidden />

        <section className="t-aboutCard">
          <header className="t-aboutHead">
            <div>
              <div className="t-kicker">
                <span className="t-dot" aria-hidden />
                Historia · 3 pasos
              </div>
              <h1>
                Acerca de <span className="t-shineText">Tarabaña</span>
              </h1>
              <p>
                Un camino simple: empezar pequeño, mejorar obsesivamente, y escalar con
                calidad.
              </p>
            </div>

            <div className="t-aboutMedia">
              <img src={TapImg} alt="Taproom Tarabaña" />
              <div className="t-caption">Imagen provisional (la cambiamos después).</div>
            </div>
          </header>

          <div className="t-timeline">
            {steps.map((s, idx) => (
              <div key={s.year} className="t-step">
                <div className="t-rail">
                  <div className="t-node">{idx + 1}</div>
                  <div className="t-line" />
                </div>

                <div className="t-stepBody">
                  <div className="t-stepTop">
                    <div className="t-year">{s.year}</div>
                    <div className="t-tag">{s.tag}</div>
                  </div>

                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
