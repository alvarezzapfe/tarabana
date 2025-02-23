// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/tara.png"; // Ajusta la ruta si es necesario
import "../assets/css/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={handleNavClick}>
          <img src={Logo} alt="Logotipo de Tarabaña" className="logo-small" />
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/#hero" className="nav-link" onClick={handleNavClick}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/#about" className="nav-link" onClick={handleNavClick}>
                Acerca de
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/#cervezas"
                className="nav-link"
                onClick={handleNavClick}
              >
                Cervezas de Línea
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/TapRoom" className="nav-link" onClick={handleNavClick}>
                Tap Room
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/#historia"
                className="nav-link"
                onClick={handleNavClick}
              >
                Historia
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={handleNavClick}>
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="btn btn-outline-light ms-3"
                onClick={handleNavClick}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
