// src/components/Navbar.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/tara.png";
import "../assets/css/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((s) => !s);
  const closeMenu = () => setMenuOpen(false);

  // Cierra menú cuando cambia ruta/hash
  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  // Sticky/blur cuando scrollea
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea scroll del body en mobile cuando menú abierto
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cierra con ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navClass = useMemo(() => {
    return `navbar navbar-expand-lg navbar-dark custom-navbar ${
      scrolled ? "is-scrolled" : ""
    }`;
  }, [scrolled]);

  return (
    <nav className={navClass}>
      {/* Overlay para mobile: arregla clicks + cierra menú al click fuera */}
      {menuOpen && <div className="t-navOverlay" onClick={closeMenu} aria-hidden />}

      <div className="container">
        <Link to="/" className="navbar-brand brand-wrap" onClick={closeMenu}>
          <img src={Logo} alt="Logotipo de Tarabaña" className="logo-big" />
          <span className="brand-glow" aria-hidden />
        </Link>

        <button
          className={`navbar-toggler t-toggler ${menuOpen ? "is-open" : ""}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <span className="t-burger" />
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto nav-ul">
            <li className="nav-item">
              <Link to="/#hero" className="nav-link t-link" onClick={closeMenu}>
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link t-link" onClick={closeMenu}>
                Acerca de
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/#cervezas" className="nav-link t-link" onClick={closeMenu}>
                Cervezas de Línea
              </Link>
            </li>

            {/* ✅ NUEVO */}
            <li className="nav-item">
              <Link to="/fabrica" className="nav-link t-link" onClick={closeMenu}>
                Fábrica
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/TapRoom" className="nav-link t-link" onClick={closeMenu}>
                Tap Room
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/shop" className="nav-link t-link" onClick={closeMenu}>
                Compra en línea
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link t-link" onClick={closeMenu}>
                Contacto
              </Link>
            </li>

            <li className="nav-item nav-cta">
              <Link
                to="/login"
                className="btn btn-outline-light ms-lg-3 t-loginBtn"
                onClick={closeMenu}
              >
                Login
              </Link>
            </li>

            {/* CTA (minimal premium, sin shine) */}
            <li className="nav-item nav-cta">
              <Link to="/shop" className="t-cta" onClick={closeMenu}>
                Comprar ahora
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
