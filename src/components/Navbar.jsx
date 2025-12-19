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
  const handleNavClick = () => setMenuOpen(false);

  // Cierra menú cuando cambia ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Efecto sticky + blur al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = useMemo(() => {
    return `navbar navbar-expand-lg navbar-dark custom-navbar ${scrolled ? "is-scrolled" : ""}`;
  }, [scrolled]);

  return (
    <nav className={navClass}>
      <div className="container">
        <Link to="/" className="navbar-brand brand-wrap" onClick={handleNavClick}>
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
              <Link to="/#hero" className={`nav-link t-link`} onClick={handleNavClick}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/#about" className="nav-link t-link" onClick={handleNavClick}>
                Acerca de
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/#cervezas" className="nav-link t-link" onClick={handleNavClick}>
                Cervezas de Línea
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/TapRoom" className="nav-link t-link" onClick={handleNavClick}>
                Tap Room
              </Link>
            </li>

            {/* NUEVO: Compra en línea */}
            <li className="nav-item">
              <Link to="/shop" className="nav-link t-link" onClick={handleNavClick}>
                Compra en línea
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link t-link" onClick={handleNavClick}>
                Contacto
              </Link>
            </li>

            <li className="nav-item nav-cta">
              <Link
                to="/login"
                className="btn btn-outline-light ms-lg-3 t-loginBtn"
                onClick={handleNavClick}
              >
                Login
              </Link>
            </li>

            {/* CTA Marrano (lujo): botón premium */}
            <li className="nav-item nav-cta">
              <a
                href="https://www.tarabana.mx/shop"
                className="t-cta"
                onClick={handleNavClick}
              >
                Comprar ahora
                <span className="t-ctaShine" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
