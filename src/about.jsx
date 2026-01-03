// src/about.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/css/about.css";

import HistoryImg from "./assets/images/history.jpg"; // (o .JPEG si así quedó)

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const hlAnnual = 1200;

  const steps = useMemo(
    () => [
      {
        year: "2021",
        title: "Encendimos la primera llama",
        desc:
          "Pequeño equipo. Planta chica. Un objetivo grande: que cada lote tenga intención y memoria.",
        tag: "Origen",
      },
      {
        year: "2024–2025",
        title: "La obsesión se volvió método",
        desc:
          "Medimos, corregimos, repetimos. La calidad no se promete: se entrena. Se cuida. Se defiende.",
        tag: "Calidad",
      },
      {
        year: "2026",
        title: "Escala con identidad",
        desc: `Nueva planta en Lerma. Capacidad de 10,000 litros mensuales (≈ ${hlAnnual.toLocaleString()} hL anuales). Más volumen, misma exigencia: que la pinta llegue perfecta.`,
        tag: "Escala",
      },
    ],
    [hlAnnual]
  );

  // ===== reveal on scroll =====
  const rootRef = useRef(null);
  const [inView, setInView] = useState({
    hero: false,
    story: false,
    steps: false,
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const key = e.target.getAttribute("data-reveal");
          setInView((p) => ({ ...p, [key]: true }));
          io.unobserve(e.target);
        });
      },
      { threshold: 0.15, rootMargin: "80px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ===== dynamic background (mouse) =====
  const bgRef = useRef(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const onMove = (ev) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const x = (ev.clientX / w) * 100; // 0..100
      const y = (ev.clientY / h) * 100; // 0..100
      el.style.setProperty("--mx", `${x.toFixed(2)}%`);
      el.style.setProperty("--my", `${y.toFixed(2)}%`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ===== helper: split to animated lines =====
  const Lines = ({ text }) => {
    const parts = String(text).split("\n").filter(Boolean);
    return (
      <div className="t-lines" aria-label={text}>
        {parts.map((line, i) => (
          <span
            key={i}
            className="t-line"
            style={{ ["--d"]: `${i * 90}ms` }}
          >
            {line}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="t-aboutPage" ref={rootRef}>
      <Navbar />

      {/* Fondo dinámico grande */}
      <div className="t-cineBg" ref={bgRef} aria-hidden>
        <div className="t-cineGlow" />
        <div className="t-cineGrid" />
        <div className="t-cineNoise" />
      </div>

      <main className="t-cineWrap">
        {/* HERO */}
        <section className={`t-hero ${inView.hero ? "is-in" : ""}`} data-reveal="hero">
          <div className="t-heroInner">
            <div className="t-heroCopy">
              <div className="t-kicker">
                <span className="t-dot" aria-hidden />
                Historia
              </div>

              <h1 className="t-title">
                Tarabaña no se “hizo”.
                <span className="t-shineText"> Se forjó.</span>
              </h1>

              <Lines
                text={
                  "Empezamos pequeños.\nAprendimos a escuchar el proceso.\nY decidimos no soltar la vara: nunca."
                }
              />

              <div className="t-heroMeta">
                <div className="t-metaItem">
                  <div className="t-metaVal">3</div>
                  <div className="t-metaLab">etapas</div>
                </div>
                <div className="t-metaItem">
                  <div className="t-metaVal">10,000L</div>
                  <div className="t-metaLab">mensuales</div>
                </div>
                <div className="t-metaItem">
                  <div className="t-metaVal">{hlAnnual.toLocaleString()} hL</div>
                  <div className="t-metaLab">anuales</div>
                </div>
              </div>
            </div>

            <div className="t-heroMedia">
              <div className="t-imgShell">
                <img src={HistoryImg} alt="Historia de Tarabaña" />
                <div className="t-imgVignette" aria-hidden />
              </div>
              <div className="t-caption">
                Donde empieza el olor a malta, empieza también la promesa.
              </div>
            </div>
          </div>

          <div className="t-scrollHint" aria-hidden>
            <span className="t-scrollDot" />
            <span className="t-scrollText">Desliza</span>
          </div>
        </section>

        {/* STORY */}
        <section className={`t-story ${inView.story ? "is-in" : ""}`} data-reveal="story">
          <div className="t-storyInner">
            <p className="t-storyP">
              No fue un “lanzamiento”. Fue una repetición infinita de decisiones pequeñas:
              ajustar una temperatura, esperar un día más, descartar un lote que no estaba
              a la altura. Porque la cerveza no perdona la prisa.
            </p>
            <p className="t-storyP">
              Tarabaña crece así: con paciencia, con ciencia, con instinto. Con la idea
              de que una pinta impecable no es suerte — es disciplina.
            </p>
          </div>
        </section>

        {/* STEPS */}
        <section className={`t-steps ${inView.steps ? "is-in" : ""}`} data-reveal="steps">
          <div className="t-stepsHead">
            <h2>
              Tres momentos. <span className="t-shineText">Una sola obsesión.</span>
            </h2>
            <p>Que cada vaso cuente la misma historia: bien hecha.</p>
          </div>

          <div className="t-stepList">
            {steps.map((s, idx) => (
              <article
                key={s.year}
                className="t-stepRow"
                style={{ ["--d"]: `${idx * 120}ms` }}
              >
                <div className="t-stepLeft">
                  <div className="t-stepYear">{s.year}</div>
                  <div className="t-stepTag">{s.tag}</div>
                </div>

                <div className="t-stepMid" aria-hidden>
                  <div className="t-stepIndex">{String(idx + 1).padStart(2, "0")}</div>
                  <div className="t-stepRule" />
                </div>

                <div className="t-stepRight">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
