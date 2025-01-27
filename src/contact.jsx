import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/contact.css";
import { Link } from "react-router-dom";

// Importar la imagen
import Logo from "./assets/images/tara.png";

const Contact = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <img src={Logo} alt="Logotipo de Tarabana" className="logo-small" />
          <Link to="/" className="navbar-brand"></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Inicio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="contact-section d-flex justify-content-center align-items-center">
        <div className="contact-info-box">
          <h2>Escríbenos</h2>
          <ul className="contact-list">
            <li>
              <strong>Correo:</strong> hola@tarabana.mx
            </li>
            <li>
              <strong>Dirección:</strong> Lerma, Estado de México.
            </li>
            <li>
              <strong>Instagram:</strong>{" "}
              <a
                href="https://instagram.com/tarabana.mx"
                target="_blank"
                rel="noopener noreferrer"
              >
                tarabana.mx
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white text-center">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Compañía Cervecera Tierra Mojada
            S.A.P.I de C.V. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
