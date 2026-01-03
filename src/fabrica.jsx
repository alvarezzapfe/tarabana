// src/fabrica.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/css/fabrica.css";

import AOS from "aos";
import "aos/dist/aos.css";

/**
 * ✅ Usa tus rutas reales:
 * - Si ya usas /public/images: déjalo así.
 * - Si estás usando base64 “en línea”, pega tu string aquí.
 */
const fab1 = "/images/fabrica1.jpg";
const fab2 = "/images/fabrica2.jpg";
const fab3 = "/images/fabrica3.jpg";

const fallback =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000'%3E%3Crect width='100%25' height='100%25' fill='%230b0f18'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='Arial' font-size='36'%3EImagen no encontrada%3C/text%3E%3C/svg%3E";

const Img = ({ src, alt, className, onClick, title }) => {
  const [ok, setOk] = useState(true);
  return (
    <img
      src={ok ? src : fallback}
      alt={alt}
      title={title}
      className={className}
      loading="lazy"
      decoding="async"
      onClick={onClick}
      onError={() => {
        setOk(false);
        console.warn("No se pudo cargar imagen:", src);
      }}
    />
  );
};

export default function Fabrica() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
    });
  }, []);

  const images = useMemo(
    () => [
      {
        src: fab1,
        title: "Brewhouse · donde nace el carácter",
        desc:
          "Molienda, hervor y whirlpool: precisión y timing. Aquí se define el cuerpo, el aroma y la intención.",
        meta: ["Brewhouse", "Control", "Ejecución"],
      },
      {
        src: fab2,
        title: "Fermentación · disciplina líquida",
        desc:
          "Temperatura, presión, levadura y paciencia. La fermentación es donde la receta se vuelve personalidad.",
        meta: ["Fermentación", "Consistencia", "Perfil"],
      },
      {
        src: fab3,
        title: "Calidad · la pinta se gana aquí",
        desc:
          "Sanitización, CO₂, oxígeno disuelto y checks. Lo que no se mide, no se mejora. Punto.",
        meta: ["QA/QC", "CO₂", "Sanidad"],
      },
    ],
    []
  );

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const openLightbox = useCallback((idx) => {
    setActiveIdx(idx);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setActiveIdx((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIdx((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prev, next]);

  const active = images[activeIdx];

  return (
    <div className="tf-page">
      <Navbar />

      {/* HERO */}
      <header className="tf-hero">
        <div className="tf-heroBg" aria-hidden>
          <Img src={fab1} alt="Fábrica Tarabaña" className="tf-heroImg" />
        </div>
        <div className="tf-heroOverlay" aria-hidden />
        <div className="tf-heroNoise" aria-hidden />

        <div className="tara-container tf-heroInner">
          <div className="tf-heroCopy" data-aos="fade-up">
            <div className="tf-kicker">
              <span className="tf-dot" aria-hidden />
              Fábrica · Lerma, Edo. Méx.
            </div>

            <h1>
              Donde el lúpulo <span className="tf-grad">se vuelve ritual</span>.
            </h1>

            <p>
              Una planta no es un lugar: es un estándar. Aquí se cocina el carácter, se
              entrena la consistencia y se protege la pinta con obsesión por el detalle.
            </p>

            <div className="tf-ctas">
              <Link to="/contact" className="tf-btn tf-btn--primary">
                Agendar tour <i className="fa-solid fa-arrow-right" aria-hidden />
              </Link>
              <a href="#proceso" className="tf-btn tf-btn--ghost">
                Ver proceso
              </a>
            </div>

            <div className="tf-sub">
              Taproom: <strong>Condesa · CDMX</strong> · Fábrica:{" "}
              <strong>Lerma · Edo. Méx.</strong>
            </div>
          </div>

          <div className="tf-heroCard" data-aos="fade-up" data-aos-delay="160">
            <div className="tf-card">
              <div className="tf-cardTop">
                <h3>Tour guiado</h3>
                <span className="tf-badge">Guided</span>
              </div>

              <div className="tf-tourGrid">
                {[
                  { t: "Brewhouse", d: "molienda → hervor → whirlpool" },
                  { t: "Fermentación", d: "temperatura, presión, tiempos" },
                  { t: "Calidad", d: "CO₂, O₂ disuelto, sanitización" },
                  { t: "Cata", d: "según disponibilidad del día" },
                ].map((x) => (
                  <div key={x.t} className="tf-tourTile">
                    <div className="tf-tourTitle">{x.t}</div>
                    <div className="tf-tourDesc">{x.d}</div>
                  </div>
                ))}
              </div>

              <div className="tf-cardCtas">
                <Link to="/contact" className="tf-btn tf-btn--primary tf-btn--full">
                  Contacto para tour
                </Link>
                <Link to="/taplist" className="tf-btn tf-btn--ghost tf-btn--full">
                  Ver Tap List
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="tf-scrollHint" aria-hidden>
          <span />
        </div>
      </header>

      {/* PROCESO (sección nueva, mantiene estructura general “en medio”) */}
      <section id="proceso" className="tf-process">
        <div className="tara-container tf-processInner">
          <div className="tf-processMedia" data-aos="zoom-in">
            <button
              type="button"
              className="tf-processMediaBtn"
              onClick={() => openLightbox(0)}
              aria-label="Abrir imagen de brewhouse"
            >
              <Img
                src={images[0].src}
                alt={images[0].title}
                className="tf-processImg"
                title="Click para expandir"
              />
              <div className="tf-processShade" aria-hidden />
              <div className="tf-processStamp">LERMA</div>
            </button>
          </div>

          <div className="tf-processCopy" data-aos="fade-up" data-aos-delay="120">
            <h2>Proceso</h2>
            <p>
              No buscamos “hacer cheve”. Buscamos <strong>hacerla bien</strong>, cada vez.
              Balance, limpieza, control, y lúpulo con intención. Lo demás… es ruido.
            </p>

            <div className="tf-points">
              {[
                {
                  t: "Timing exacto",
                  d: "Curvas de temperatura y puntos de adición sin margen de error.",
                },
                {
                  t: "Consistencia real",
                  d: "Medimos lo que importa: CO₂, O₂ disuelto, estabilidad, limpieza.",
                },
                {
                  t: "Hype con fundamento",
                  d: "Lupulado brillante, aroma intenso y un final seco que pide otra.",
                },
              ].map((x) => (
                <div className="tf-point" key={x.t} data-aos="fade-up">
                  <div className="tf-pointTitle">{x.t}</div>
                  <div className="tf-pointDesc">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="tf-processCtas">
              <a className="tf-btn tf-btn--primary" href="#galeria">
                Ver galería <i className="fa-solid fa-arrow-down" aria-hidden />
              </a>
              <Link className="tf-btn tf-btn--ghost" to="/contact">
                Preguntar por tours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <main className="tf-main" id="galeria">
        <section className="tara-container tf-sectionHead" data-aos="fade-up">
          <h2>La planta</h2>
          <p>
            
          </p>
        </section>

        {/* Cinema XL */}
        <section className="tara-container tf-galleryPro">
          <button
            className="tf-cinema"
            type="button"
            onClick={() => openLightbox(0)}
            data-aos="zoom-in"
          >
            <Img src={images[0].src} alt={images[0].title} className="tf-cinemaImg" />
            <div className="tf-cinemaShade" aria-hidden />
            <div className="tf-cinemaMeta">
              <div className="tf-cinemaTitle">{images[0].title}</div>
              <div className="tf-cinemaDesc">{images[0].desc}</div>
              <div className="tf-chipRow">
                {images[0].meta.map((m) => (
                  <span className="tf-chip" key={m}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="tf-cinemaHint">Ver</div>
          </button>

          <div className="tf-row2">
            {images.slice(1).map((img, idx) => {
              const realIdx = idx + 1;
              return (
                <button
                  key={img.title}
                  className="tf-wide"
                  type="button"
                  onClick={() => openLightbox(realIdx)}
                  data-aos="fade-up"
                  data-aos-delay={80 + idx * 80}
                >
                  <Img src={img.src} alt={img.title} className="tf-wideImg" />
                  <div className="tf-wideShade" aria-hidden />
                  <div className="tf-wideMeta">
                    <div className="tf-wideTitle">{img.title}</div>
                    <div className="tf-wideDesc">{img.desc}</div>
                    <div className="tf-chipRow">
                      {img.meta.map((m) => (
                        <span className="tf-chip" key={m}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="tara-container tf-cta" data-aos="fade-up">
          <div className="tf-ctaInner">
            <div>
              <h3>¿Quieres tour guiado?</h3>
              <p>
                Agenda con nosotros. Si hay ventana en producción, lo hacemos todavía más
                impresionante.
              </p>
            </div>
            <div className="tf-ctaBtns">
              <Link to="/contact" className="tf-btn tf-btn--primary">
                Contactar <i className="fa-solid fa-arrow-right" aria-hidden />
              </Link>
              <Link to="/taproom" className="tf-btn tf-btn--ghost">
                Ver Taproom
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="tf-lightbox" role="dialog" aria-modal="true" aria-label="Galería">
          <div className="tf-lbBackdrop" onClick={closeLightbox} aria-hidden />

          <div className="tf-lbPanel">
            <button className="tf-lbClose" onClick={closeLightbox} aria-label="Cerrar">
              <i className="fa-solid fa-xmark" />
            </button>

            <button className="tf-lbNav tf-lbNav--prev" onClick={prev} aria-label="Anterior">
              <i className="fa-solid fa-chevron-left" />
            </button>

            <button className="tf-lbNav tf-lbNav--next" onClick={next} aria-label="Siguiente">
              <i className="fa-solid fa-chevron-right" />
            </button>

            <div className="tf-lbMedia">
              <img src={active.src} alt={active.title} />
            </div>

            <div className="tf-lbMeta">
              <div className="tf-lbTitle">{active.title}</div>
              <div className="tf-lbDesc">{active.desc}</div>
              <div className="tf-lbCount">
                {activeIdx + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
