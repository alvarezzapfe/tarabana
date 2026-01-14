// src/App.jsx
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import WhatsAppWidget from "./components/WhatsAppWidget";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Fabrica from "./fabrica";
import Shop from "./shop.jsx";
import About from "./about";
import Contact from "./contact";
import TapRoom from "./TapRoom";
import TapList from "./TapList";
import Login from "./login";

import "./assets/css/navbar.css";
import "./assets/css/index.css";

// Backgrounds
import heroImg from "./assets/images/hero.jpg";
import hero2Img from "./assets/images/hero2.jpg";

// ✅ PNG renders (latas)
import brisaCan from "./assets/images/brisalata.png";
import chulaVistaCan from "./assets/images/chulavistalata.png";
import calizaCan from "./assets/images/calizalata.png";
import siliceCan from "./assets/images/silicelata.png";
import magmaCan from "./assets/images/magmalata.png";

// ✅ Collage/Foto todas las latas
import todasLatasImg from "./assets/images/todaslatas.png";

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
    AOS.init({ duration: 760, easing: "ease-out-cubic", once: true });

    document.documentElement.style.setProperty(
      "--hero-background-image",
      `url(${heroImg})`
    );
    document.documentElement.style.setProperty(
      "--hero2-background-image",
      `url(${hero2Img})`
    );

    // Parallax sutil (solo desktop)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const x = e.clientX / w - 0.5;
      const y = e.clientY / h - 0.5;
      document.documentElement.style.setProperty(
        "--hero-parallax-x",
        (x * 14).toFixed(2)
      );
      document.documentElement.style.setProperty(
        "--hero-parallax-y",
        (y * 10).toFixed(2)
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ✅ 5 chelas — TODAS MISMO TAMAÑO (sin featured)
  const lineup = [
    {
      name: "Brisa",
      style: "Session IPA",
      abv: "4.5%",
      ibu: 32,
      notes: "Ligera · fresca · aromática",
      img: brisaCan,
      tone: "lime",
    },
    {
      name: "Chula Vista",
      style: "West Coast IPA",
      abv: "6.8%",
      ibu: 62,
      notes: "Pino · grapefruit · seca",
      img: chulaVistaCan,
      tone: "amber",
    },
    {
      name: "Caliza",
      style: "Hazy IPA",
      abv: "6.3%",
      ibu: 38,
      notes: "Tropical · juicy · suave",
      img: calizaCan,
      tone: "gold",
    },
    {
      name: "Sílice",
      style: "Czech Pils",
      abv: "5.0%",
      ibu: 36,
      notes: "Crisp · noble hops · precisa",
      img: siliceCan,
      tone: "ice",
    },
    {
      name: "Magma",
      style: "Doble IPA",
      abv: "8.5%",
      ibu: 75,
      notes: "Intensa · lupulada · peligrosa",
      img: magmaCan,
      tone: "magma",
    },
  ];

  return (
    <div className="tara">
      <Navbar />

      {/* HERO */}
      <header id="hero" className="tara-hero tara-hero--xl">
        <div className="tara-hero__overlay" aria-hidden />
        <div className="tara-hero__fx" aria-hidden />

        <div className="tara-container tara-hero__inner">
          <div className="tara-hero__copy" data-aos="fade-up">
            <span className="tara-kicker">
              <span className="tara-kickerDot" aria-hidden />
              Fábrica de Cervezas Tarabaña
            </span>

            <h1>
              Somos Craft para todos.
              <span className="tara-gradientText"> Lupulada y balanceada.</span>
            </h1>

            <p>
              Taproom en <strong>Condesa · CDMX</strong>. Fábrica en{" "}
              <strong>Lerma · Edo. Méx.</strong>
              <br />
              Tarabaña es una cerveza para todos.
            </p>

            <div className="tara-hero__ctas">
              <a className="tara-btn tara-btn--orange" href="#cervezas">
                Cervezas de línea{" "}
                <i className="fa-solid fa-arrow-right" aria-hidden />
              </a>
              <Link className="tara-btn tara-btn--orangeGhost" to="/taplist">
                Ver Tap List
              </Link>
            </div>

            <div className="tara-mini tara-mini--hero">
              <span>
                <i className="fa-solid fa-location-dot" /> Taproom: Condesa (CDMX)
              </span>
              <span>
                <i className="fa-solid fa-industry" /> Fábrica: Lerma (Edo. Méx.)
              </span>
              <span>
                <i className="fa-solid fa-bolt" /> Menú en vivo
              </span>
            </div>

            <div
              className="tara-hero__micro"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              <a className="tara-microLink" href="#craft">
                Lo que nos mueve <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <div
            className="tara-hero__card"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            <div className="tara-glassCard tara-glassCard--dark">
              <div className="tara-glassCard__top">
                <div>
                  <h3>Tap List en vivo</h3>
                  <p>Abre el menú digital y mira lo que está saliendo hoy.</p>
                </div>
                <span className="tara-pill tara-pill--live">Live</span>
              </div>

              <div className="tara-glassCard__rows">
                <div className="tara-row">
                  <span className="tara-dot tara-dot--a" />
                  <div>
                    <strong>Actualizado al momento</strong>
                    <div className="tara-muted">siempre al día</div>
                  </div>
                </div>
                <div className="tara-row">
                  <span className="tara-dot tara-dot--b" />
                  <div>
                    <strong>Cae por una pinta</strong>
                    <div className="tara-muted">
                      música · cocina · chela fresca
                    </div>
                  </div>
                </div>
              </div>

              <div className="tara-glassCard__ctas">
                <Link
                  className="tara-btn tara-btn--orange tara-btn--full"
                  to="/taplist"
                >
                  Abrir Tap List
                </Link>
                <Link
                  className="tara-btn tara-btn--orangeGhost tara-btn--full"
                  to="/TapRoom"
                >
                  Ver Taproom
                </Link>
              </div>

              <div className="tara-glassCard__hint">
                <span className="tara-hintDot" aria-hidden />
                Tip: pregunta por nuestras Cervezas de Temporada.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CRAFT */}
      <section id="craft" className="tara-craft">
        <div className="tara-craft__bg" aria-hidden />
        <div className="tara-container tara-craft__inner">
          <div className="tara-craft__copy" data-aos="fade-up">
            <span className="tara-craftKicker">
              <span className="tara-craftDot" aria-hidden />
              Pasión & Proceso
            </span>

            <h2>
              Esto no es “hacer chela”.
              <span className="tara-gradientText"> Es obsesión por calidad.</span>
            </h2>

            <p>
              Nos mueve el craft real: agua bien tratada, fermentación cuidada y
              lúpulos que explotan sin tapar el balance. Hacemos cervezas{" "}
              <strong>lupuladas</strong> con precisión: aroma que se siente antes
              del primer trago y un final limpio que pide otro.
            </p>

            <div className="tara-craftBullets">
              <div className="tara-craftBullet">
                <strong>Aroma arriba</strong>
                <div className="tara-muted2">lúpulos con intención</div>
              </div>
              <div className="tara-craftBullet">
                <strong>Balance exacto</strong>
                <div className="tara-muted2">cuerpo · amargor · finish</div>
              </div>
              <div className="tara-craftBullet">
                <strong>Siempre vivo</strong>
                <div className="tara-muted2">experimentar también es método</div>
              </div>
            </div>

            <div className="tara-craftCtas">
              <Link className="tara-btn tara-btn--orange" to="/taplist">
                Ver Tap List{" "}
                <i className="fa-solid fa-arrow-right" aria-hidden />
              </Link>
              <Link className="tara-btn tara-btn--orangeGhost" to="/contact">
                Eventos / Contacto
              </Link>
            </div>
          </div>

          <div className="tara-craft__media" data-aos="fade-up" data-aos-delay="120">
            <div className="tara-craftImg" aria-hidden />
            <div className="tara-craftCaption">Cuidamos cada detalle.</div>
          </div>
        </div>
      </section>

      {/* CERVEZAS — 5 en la MISMA FILA */}
      <section id="cervezas" className="tara-sec tara-sec--alt">
        <div className="tara-container">
          <div className="tara-secHead" data-aos="fade-up">
            <h2>Cervezas de línea</h2>
            <p>
              Cinco estilos que definen a Tarabaña.{" "}
              <strong>Grandes, limpias y con carácter.</strong>
            </p>
          </div>

          <div className="tara-lineupRow5">
            {lineup.map((b, i) => (
              <article
                key={`${b.name}-${i}`}
                className={`tara-poster tone-${b.tone}`}
                style={{ "--ibu": b.ibu }}
                data-aos="fade-up"
                data-aos-delay={60 + i * 60}
              >
                <div className="tara-poster__media" aria-hidden="true">
                  <img src={b.img} alt="" loading="lazy" decoding="async" />
                  <div className="tara-poster__fx" aria-hidden />
                </div>

                <div className="tara-poster__body">
                  <div className="tara-poster__head">
                    <div>
                      <div className="tara-poster__name">{b.name}</div>
                      <div className="tara-poster__style">{b.style}</div>
                    </div>
                    <div className="tara-poster__badge">
                      {b.name === "Magma" ? "🔥" : "●"}
                    </div>
                  </div>

                  <div className="tara-poster__notes">{b.notes}</div>

                  <div className="tara-poster__meta">
                    <span className="tara-pillMeta">ABV {b.abv}</span>
                    <span className="tara-pillMeta">IBU {b.ibu}</span>
                  </div>

                  <div className="tara-ibu tara-ibu--poster">
                    <div className="tara-ibuTop">
                      <span className="tara-ibuLabel">Amargor</span>
                      <span className="tara-ibuValue">{b.ibu} IBU</span>
                    </div>
                    <div
                      className="tara-ibuTrack"
                      role="img"
                      aria-label={`Amargor ${b.ibu} IBU`}
                    >
                      <div
                        className="tara-ibuFill"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(8, (b.ibu / 80) * 100)
                          )}%`,
                        }}
                      />
                      <div className="tara-ibuGlow" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="tara-poster__ctas">
                    <Link className="tara-btn tara-btn--orange tara-btn--sm" to="/taplist">
                      Ver Tap List
                    </Link>
                    <Link className="tara-btn tara-btn--orangeGhost tara-btn--sm" to="/TapRoom">
                      Taproom
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ✅ ESPACIO ABAJO PARA TODAS LAS LATAS */}
          <div className="tara-allCans" data-aos="fade-up">
            <div className="tara-allCans__frame">
              <img
                src={todasLatasImg}
                alt="Todas las latas Tarabaña"
                loading="lazy"
                decoding="async"
              />
              <div className="tara-allCans__fx" aria-hidden />
            </div>
            <div className="tara-allCans__cap">
              <strong>El lineup completo</strong> — renders oficiales.
            </div>
          </div>

          <div className="tara-lineupFooter" data-aos="fade-up">
            <Link className="tara-link" to="/taplist">Ver Tap List →</Link>
            <Link className="tara-link" to="/TapRoom">Ver Taproom →</Link>
            <Link className="tara-link" to="/contact">Eventos / Contacto →</Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="tara-sec tara-sec--cta">
        <div className="tara-container">
          <div className="tara-cta" data-aos="fade-up">
            <div>
              <h3>¿Listo para caer?</h3>
              <p>Menú en vivo, chela fresca y ambiente Condesa.</p>
            </div>
            <div className="tara-ctaBtns">
              <Link className="tara-btn tara-btn--orange" to="/taplist">
                Tap List
              </Link>
              <Link className="tara-btn tara-btn--orangeGhost" to="/TapRoom">
                Taproom
              </Link>
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
        <Route path="/fabrica" element={<Fabrica />} />
      </Routes>

      <WhatsAppWidget />
    </Router>
  );
}
