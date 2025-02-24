// src/components/Footer.jsx
import React from "react";
import Logo from "../assets/images/tara.png";

const Footer = () => {
  return (
    <footer className="footer-section text-white">
      <div className="container">
        {/* Logotipo */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-4 text-center">
            <img
              src={Logo}
              alt="Logotipo de Tarabana"
              className="footer-logo"
            />
          </div>
        </div>

        {/* Información Principal */}
        <div className="row">
          {/* Contacto */}
          <div className="col-md-3">
            <h5>Contacto</h5>
            <p>Tel: +52 123 456 7890</p>
            <p>Email: hola@tarabana.mx</p>
          </div>

          {/* Enlaces */}
          <div className="col-md-3">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#hero" className="text-white text-decoration-none">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#cervezas" className="text-white text-decoration-none">
                  Cervezas de Línea
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#historia" className="text-white text-decoration-none">
                  Historia
                </a>
              </li>
              <li>
                <a href="/TapRoom" className="text-white text-decoration-none">
                  Tap Room
                </a>
              </li>
            </ul>
          </div>

          {/* Alianzas */}
          <div className="col-md-3">
            <h5>También estamos</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.untappd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  Untapped
                </a>
              </li>
            </ul>
          </div>

          {/* Síguenos */}
          <div className="col-md-3">
            <h5>Síguenos</h5>
            <a
              href="https://www.facebook.com/tarabana.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/tarabana.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Derechos Reservados */}
        <div className="row mt-4">
          <div className="col text-center">
            <p className="small">
              © 2025 Compañía Cervecera Tierra Mojada S.A.P.I de C.V. Todos los
              derechos reservados.
            </p>
          </div>
        </div>

        {/* Línea Inferior */}
        <div className="footer-bottom text-center mt-3">
          <hr className="footer-line" />
          <p className="footer-emoji">
            Desarrollado internamente{" "}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4facfe", textDecoration: "none" }}
            ></a>{" "}
            con{" "}
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4facfe", textDecoration: "none" }}
            >
              React.js
            </a>{" "}
            <i className="fab fa-react"></i>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
