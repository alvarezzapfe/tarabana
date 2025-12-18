// src/TapList.jsx
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ tu Footer aparte
import "./assets/css/taplist.css";

export default function TapList() {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let container = document.getElementById("menu-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "menu-container";
      mountRef.current.appendChild(container);
    }

    const run = () => {
      if (window.PreloadEmbedMenu) {
        window.PreloadEmbedMenu("menu-container", 49211, 174935);
        setReady(true);
      }
    };

    const existing = document.querySelector('script[data-untappd="embed"]');
    if (!existing) {
      const s = document.createElement("script");
      s.src =
        "https://embed-menu-preloader.untappdapi.com/embed-menu-preloader.min.js";
      s.async = true;
      s.dataset.untappd = "embed";
      s.onload = run;
      document.body.appendChild(s);
    } else {
      run();
    }
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <main className="tl">
        <div className="tl-bg" aria-hidden />
        <div className="tl-grid" aria-hidden />

        <section className="tl-wrap">
          <header className="tl-head">
            <div className="tl-title">
              <h1>Tap List</h1>
              <p>Menú en vivo · actualizado desde el tablero</p>
            </div>

            <div className="tl-source">
              <span className="tl-pill">
                <UntappdMark />
                Untappd
              </span>
              <span className="tl-pill soft">Live</span>
            </div>
          </header>

          <div className="tl-card">
            {!ready && (
              <div className="tl-loading" role="status" aria-live="polite">
                <div className="tl-spinner" />
                <div>
                  <strong>Cargando menú…</strong>
                  <div className="tl-muted">Puede tardar un momento.</div>
                </div>
              </div>
            )}

            <div ref={mountRef} className="tl-embed" />
          </div>

          <div className="tl-footnote">
            * Este menú se muestra tal cual lo publica Untappd for Business.
          </div>
        </section>
      </main>

      <Footer /> {/* ✅ footer externo */}
    </div>
  );
}

function UntappdMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2l8 4v6c0 5.25-3.438 10.063-8 12c-4.563-1.938-8-6.75-8-12V6l8-4zm0 2.2L6 7v5c0 4.3 2.7 8.2 6 9.9c3.3-1.7 6-5.6 6-9.9V7l-6-2.8z"
      />
    </svg>
  );
}
