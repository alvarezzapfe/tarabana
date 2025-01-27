import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/tara.png"; // Ajusta la ruta si es necesario
import "../assets/css/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Logotipo de Tarabaña" className="logo-small" />
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="#hero" className="nav-link">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">
                Acerca de
              </a>
            </li>
            <li className="nav-item">
              <a href="#team" className="nav-link">
                Equipo
              </a>
            </li>
            <li className="nav-item">
              <a href="#linea" className="nav-link">
                Cervezas de Línea
              </a>
            </li>
            <li className="nav-item">
              <Link to="/TapRoom" className="nav-link">
                Tap Room
              </Link>
            </li>
            <li className="nav-item">
              <a href="#history" className="nav-link">
                Historia
              </a>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-light ms-3">
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
