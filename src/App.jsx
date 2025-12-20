// src/App.jsx
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import WhatsAppWidget from "./components/WhatsAppWidget";

import Shop from "./shop.jsx";

import About from "./about";


import "./assets/css/navbar.css";
import "./assets/css/index.css";

import AOS from "aos";
import "aos/dist/aos.css";

import heroBackgroundImage from "./assets/images/fv.jpg";
import magmaImg from "./assets/images/magma.jpg";

import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./contact";
import TapRoom from "./TapRoom";
import TapList from "./TapList";

import Login from "./login";

const ScrollToHash = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);
  return null;
};

function Home() {
  useEffect(() => {
    AOS.init({ duration: 650, easing: "ease-out-cubic", once: true });

    // Se guarda el background como variable CSS
    document.documentElement.style.setProperty(
      "--hero-background-image",
      `url(${heroBackgroundImage})`
    );
  }, []);

  return (
    <div className="tara">
      <Navbar />

      {/* HERO */}
      <header id="hero" className="tara-hero">
        {/* El fondo HD se dibuja vía ::before en CSS */}
        <div className="tara-hero__overlay" />
        <div className="tara-hero__grid" aria-hidden />

        <div className="tara-container tara-hero__inner">
          <div className="tara-hero__copy" data-aos="fade-up">
            <span className="tara-kicker">Fábrica de Cervezas Tarabaña</span>
            <h1>Cervecería independiente</h1>
            <p>
              Cerveza artesanal hecha en México. Hacemos Cerveza Balanceada y Lupulada para llevarte nuevas experiencias.
              Ven al tap y descubre lo que está conectado hoy.
            </p>

            <div className="tara-hero__ctas">
              <a className="tara-btn tara-btn--primary" href="#hoy">
                Hoy en el tap
              </a>
              <Link className="tara-btn tara-btn--ghost" to="/taplist">
                Ver Tap List
              </Link>
            </div>

            <div className="tara-mini">
              <span><i className="fa-solid fa-location-dot" /> Condesa · CDMX</span>
              <span><i className="fa-solid fa-beer-mug-empty" /> Taproom</span>
              <span><i className="fa-solid fa-bolt" /> Menú en vivo</span>
            </div>
          </div>

          <div className="tara-hero__card" data-aos="fade-up" data-aos-delay="120">
            <div className="tara-glassCard">
              <div className="tara-glassCard__top">
                <div>
                  <h3>Tap List en vivo</h3>
                  <p>Abre el menú digital y ve lo que está saliendo.</p>
                </div>
                <span className="tara-pill">Live</span>
              </div>

              <div className="tara-glassCard__rows">
                <div className="tara-row">
                  <span className="tara-dot tara-dot--a" />
                  <div>
                    <strong>Actualizado desde Untappd</strong>
                    <div className="tara-muted">Sin fricción · siempre al día</div>
                  </div>
                </div>
                <div className="tara-row">
                  <span className="tara-dot tara-dot--b" />
                  <div>
                    <strong>Cae por una pinta</strong>
                    <div className="tara-muted">Ambiente chill · buena música</div>
                  </div>
                </div>
              </div>

              <div className="tara-glassCard__ctas">
                <Link className="tara-btn tara-btn--primary tara-btn--full" to="/taplist">
                  Abrir Tap List
                </Link>
                <Link className="tara-btn tara-btn--ghost tara-btn--full" to="/TapRoom">
                  Ver Taproom
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HOY */}
      <section id="hoy" className="tara-sec">
        <div className="tara-container tara-split">
          <div className="tara-card tara-card--media" data-aos="fade-up">
            <img src={magmaImg} alt="Tarabaña" />
          </div>

          <div className="tara-card" data-aos="fade-up" data-aos-delay="80">
            <h2>Qué hacemos</h2>
            <p>
              Hacemos cerveza artesanal con un enfoque simple: Balance y lupulo.
            </p>

            <div className="tara-bullets">
              <div className="tara-bullet"> Estilos clásicos + temporada</div>
              <div className="tara-bullet"> Control y consistencia</div>
              <div className="tara-bullet">📍 Taproom </div>
              <div className="tara-bullet"> Colabs </div>
            </div>

            <div className="tara-inline-cta">
              <Link className="tara-link" to="/taplist">Ver Tap List →</Link>
              <Link className="tara-link" to="/contact">Eventos / Contacto →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CERBEZAS */}
      {/* CERVEZAS DE LÍNEA (PRO) */}
<section id="cervezas" className="tara-sec tara-sec--alt">
  <div className="tara-container">
    <div className="tara-secHead" data-aos="fade-up">
      <h2>Cervezas de línea</h2>
      <p>
        Nuestra iconica <strong>MAGMA</strong> + lineup completo. (La referencia
        más confiable siempre es el Tap List en vivo.)
      </p>
    </div>

    {/* MAGMA HERO (arriba al centro) */}
    <div className="tara-lineupHero" data-aos="zoom-in">
      <button
        type="button"
        className="tara-magmaHero"
        onClick={() => {
          // trigger spin (click)
          const el = document.getElementById("taraMagmaCan");
          if (!el) return;
          el.classList.remove("is-spinning");
          // reflow para reiniciar animación
          void el.offsetWidth;
          el.classList.add("is-spinning");
        }}
        aria-label="Ver Magma"
      >
        <div className="tara-magmaHero__left">
          <span className="tara-chip">Iconica</span>
          <h3>MAGMA</h3>
          <p>Doble IPA (Imperial IPA) · intensa · lupulada · peligrosa</p>
          <div className="tara-magmaHint">
            Tip: pásale el mouse / tap para girar
          </div>
        </div>

        <div className="tara-magmaHero__right">
          <img
            id="taraMagmaCan"
            className="tara-magmaCan"
            src={magmaImg}
            alt="Magma - Tarabaña"
            onMouseEnter={(e) => {
              e.currentTarget.classList.remove("is-spinning");
              void e.currentTarget.offsetWidth;
              e.currentTarget.classList.add("is-spinning");
            }}
          />
          <div className="tara-magmaGlow" aria-hidden />
        </div>
      </button>
    </div>

    {/* GRID 10 boxes */}
    <div className="tara-lineupGrid">
      {[
        { name: "Caliza", style: "Hazy IPA" },
        { name: "Tezontle", style: "American Pale Ale" },
        { name: "Brisa", style: "Session IPA" },
        { name: "Magma", style: "Doble IPA (Imperial IPA)" },
        { name: "Chula Vista", style: "West Coast IPA" },
        { name: "Miramar", style: "Red IPA" },
        { name: "Silice", style: "Czech Pils" },
        { name: "Oleaje", style: "Mexican Lager (Lager con Maiz)" },
        { name: "Aceituna naranja", style: "German Pils" },
        { name: "Arcilla", style: "Red Ale" },
      ].map((b, i) => (
        <div
          key={`${b.name}-${i}`}
          className={`tara-beerBox ${b.name === "Magma" ? "is-magma" : ""}`}
          data-aos="fade-up"
          data-aos-delay={60 + i * 30}
        >
          <div className="tara-beerTop">
            <div className="tara-beerName">{b.name}</div>
            <div className="tara-beerBadge">{b.name === "Magma" ? "🔥" : "●"}</div>
          </div>
          <div className="tara-beerStyle">{b.style}</div>

          <div className="tara-beerMeta">
            <span className="tara-beerPill">Tarabaña</span>
            <span className="tara-beerPill">Línea</span>
          </div>
        </div>
      ))}
    </div>

    <div className="tara-lineupFooter" data-aos="fade-up">
      <Link className="tara-link" to="/taplist">Ver en Tap List →</Link>
      <Link className="tara-link" to="/shop">Comprar / Cotizar →</Link>
    </div>
  </div>
</section>


      {/* CTA FINAL */}
      <section className="tara-sec tara-sec--cta">
        <div className="tara-container">
          <div className="tara-cta" data-aos="fade-up">
            <div>
              <h3>¿Listo para caer?</h3>
              <p>Revisa el menú digital y lánzate al tap.</p>
            </div>
            <div className="tara-ctaBtns">
              <Link className="tara-btn tara-btn--primary" to="/taplist">Tap List</Link>
              <Link className="tara-btn tara-btn--ghost" to="/TapRoom">Taproom</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/taplist" element={<TapList />} />
        <Route path="/TapRoom" element={<TapRoom />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />

      </Routes>

      {/* Floater global (siempre visible) */}
      <WhatsAppWidget />
    </Router>
  );
}
