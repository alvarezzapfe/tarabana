import React from "react";
import { Link } from "react-router-dom";
import "./assets/css/login.css";
import Logo from "./assets/images/tara.png"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <img src={Logo} alt="Logotipo de tarabana" className="logo-small" />
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

      {/* Login Section */}
      <div className="login-section">
        <div className="login-form">
          <h2>Portal en Desarrollo</h2>
          <p>Lanzamiento Junio 2025</p>
        </div>
      </div>

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

export default Login;
